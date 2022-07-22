const { Op } = require('sequelize');
const ServiceError = require('../error/ServiceError');
const { Sales, User, Product, SalesProducts } = require('../database/models');
const toSnakeCase = require('../utils/toSnakeCase');
const removeKey = require('../utils/removeKey');

const addProducts = async (saleId, products) => {
  await Promise.all(
    products.map(async ({ productId, quantity }) => {
      const productExists = await Product.findOne({ where: { id: productId } });
  
      if (!productExists) {
        throw new ServiceError(409, 'Product not exists!');
      }

      const payload = toSnakeCase({
        saleId,
        productId,
        quantity,
      });

      await SalesProducts.create(payload);
    }),
  );
};

const create = async (payload) => {
  if (payload.userId === payload.sellerId) {
    throw new ServiceError(409, 'It is not possible to create a sale with two equal users!');
  }

  const userExists = await User.findOne({ where: { id: payload.userId } });
  
  if (!userExists) {
    throw new ServiceError(404, 'User not exists!');
  }
  
  const sellerExists = await User.findOne({ where: { id: payload.sellerId } });
  
  if (!sellerExists) {
    throw new ServiceError(404, 'Seller not exists!');
  }

  const { products } = payload;
  const newPayload = removeKey(payload, 'products');

  const { id } = await Sales.create(toSnakeCase(newPayload));
  await addProducts(id, products);

  return { id, ...payload };
};

const modelRelations = [
  {
    model: SalesProducts,
    as: 'products',
    include: [{ model: Product, as: 'product' }],
  },
  {
    model: User,
    as: 'user',
    attributes: { exclude: ['password'] },
  },
  {
    model: User,
    as: 'seller',
    attributes: { exclude: ['password'] },
  },
];

const findAll = async (userId) => {
  const payloadUser = toSnakeCase({ userId });
  const payloadSeller = toSnakeCase({ sellerId: userId });
  
  const salesPerUser = await Sales.findAll({ 
    where: {
      [Op.or]: [
        payloadUser,
        payloadSeller,
      ],
    },
    include: modelRelations,
  });
  return salesPerUser;
};

const findOne = async (id) => {
  const salesIdExists = await Sales.findOne({ 
    where: { id },
    include: modelRelations,
  });

  if (!salesIdExists) {
    throw new ServiceError(404, 'Sales not exists!');
  }

  return salesIdExists;
};

const update = async (userId, saleId, status) => {
  const saleExists = await Sales.findOne({ where: { id: saleId }, raw: true });

  if (!saleExists) {
    throw new ServiceError(404, 'Sale nor exists!');
  }

  // if (saleExists.seller_id !== userId) {
  //   throw new ServiceError(409, 'Only seller can update status!');
  // }

  const newSale = { ...saleExists, status };
  await Sales.update(newSale, { where: { id: saleId } });

  return newSale;
};

module.exports = { 
  create,
  findAll,
  findOne,
  update,
};