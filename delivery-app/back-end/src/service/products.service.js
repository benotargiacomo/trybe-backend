// const ServiceError = require('../error/ServiceError');
const { Product } = require('../database/models');
require('dotenv').config();

const findAll = async () => {
  const result = await Product.findAll();

  return result;
};

module.exports = { findAll };