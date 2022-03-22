const salesModel = require('../models/salesModel');

const errors = {
  nameBlank: {
    code: 400,
    message: '"name" is required',
  },
  nameLength: {
    code: 422,
    message: '"name" length must be at least 5 characters long',
  },
  productExist: {
    code: 409,
    message: 'Product already exists',
  },
  quantityBlank: {
    code: 400,
    message: '"quantity" is required',
  },
  quantityLength: {
    code: 422,
    message: '"quantity" must be a number larger than or equal to 1',
  },
  idNotFound: {
    code: 404,
    message: 'Product not found',
  },
  idBlank: {
    code: 400,
    message: '"product_id" is required',
  },
  saleNotFound: {
    code: 404,
    message: 'Sale not found',
  },
};

const validateSalesQuantity = (products) => {
  const validQuantity = products.find(({ product_id: _productId, quantity }) => (
    typeof quantity !== 'number' || quantity < 1
  ));

  if (validQuantity) {
    return { code: errors.quantityLength.code, message: errors.quantityLength.message }; 
  }
};

const validateSalesBody = (products) => {
  const validBodyId = products.find(({ product_id: productId, _quantity }) => (
    productId === undefined
  ));

  if (validBodyId) {
    return { code: errors.idBlank.code, message: errors.idBlank.message };
  } 
  
  const validBodyQuantity = products.find(({ product_id: _productId, quantity }) => (
    quantity === undefined
  ));

  if (validBodyQuantity) {
    return { code: errors.quantityBlank.code, message: errors.quantityBlank.message };
  } 
};

const validateProductsBody = (name, quantity) => {
  if (!name) {
    return { code: errors.nameBlank.code, message: errors.nameBlank.message }; 
  }
  if (quantity === undefined) {
    return { code: errors.quantityBlank.code, message: errors.quantityBlank.message }; 
  }
};

const validateName = (name) => {
  if (name.length < 5) {
    return { code: errors.nameLength.code, message: errors.nameLength.message }; 
  }
};

const validateQuantity = (quantity) => {
  if (typeof quantity !== 'number' || quantity < 1) {
    return { code: errors.quantityLength.code, message: errors.quantityLength.message }; 
}
};

const validateIds = async (arr) => {
  const ids = await Promise.all(
    arr.map(async ({ product_id: id }) => {
      const product = await salesModel.productsIdCheck(id);
      
      return product;
    }),
  );
  
  const isValid = ids.every((id) => id);
  
  return isValid;
};

const validateProductId = () => ({
  code: errors.idBlank.code, message: errors.idBlank.message,
});

const validateProductExist = () => ({
    code: errors.productExist.code, message: errors.productExist.message,
  });

const validateId = () => ({
  code: errors.idNotFound.code, message: errors.idNotFound.message,
});

const validateSale = () => ({
  code: errors.saleNotFound.code, message: errors.saleNotFound.message,
});

module.exports = {
  validateProductsBody,
  validateSalesBody,
  validateSalesQuantity,
  validateName,
  validateQuantity,
  validateProductId,
  validateProductExist,
  validateId,
  validateIds,
  validateSale,
};
