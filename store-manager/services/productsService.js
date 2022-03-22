const productsModel = require('../models/productsModel');
const errors = require('../middlewares/errors');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) return errors.validateId();
  
  return product;
};

const createProduct = async (name, quantity) => {
  const validBody = errors.validateProductsBody(name, quantity);
  if (validBody) return validBody;

  const validName = errors.validateName(name);
  if (validName) return validName;

  const validQuantity = errors.validateQuantity(quantity);
  if (validQuantity) return validQuantity;

  const product = await productsModel.getByName(name);
  if (product) return errors.validateProductExist();

  const createdProduct = await productsModel.createProduct(name, quantity);

  return createdProduct;
};

const updateProduct = async (id, name, quantity) => {
  const validBody = errors.validateProductsBody(name, quantity);
  if (validBody) return validBody;

  const validName = errors.validateName(name);
  if (validName) return validName;

  const validQuantity = errors.validateQuantity(quantity);
  if (validQuantity) return validQuantity;

  const product = await productsModel.getById(id);
  if (!product) return errors.validateId();

  const updatedProduct = await productsModel.updateProduct(id, name, quantity);

  return updatedProduct;
};

const deleteProduct = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return errors.validateId();

  await productsModel.deleteProduct(id);

  return product;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};
