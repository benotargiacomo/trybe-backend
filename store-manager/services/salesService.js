const salesModel = require('../models/salesModel');
const errors = require('../middlewares/errors');

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  
  if (!sale) return errors.validateSale();

  return sale;
};

const createSale = async (products) => {
  const validBody = errors.validateSalesBody(products);
  if (validBody) return validBody;

  const validQuantity = errors.validateSalesQuantity(products);
  if (validQuantity) return validQuantity;

  const isValidIds = await errors.validateIds(products);
  if (!isValidIds) return errors.validateProductId();

  const createdSale = await salesModel.createSale(products);

  return createdSale;
};

const updateSale = async (id, sale) => {
  const validBody = errors.validateSalesBody(sale);
  if (validBody) return validBody;

  const validQuantity = errors.validateSalesQuantity(sale);
  if (validQuantity) return validQuantity;

  // VERIFICAR
  const updatedSale = await salesModel.updateSale(id, sale[0]);

  return updatedSale;
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
};