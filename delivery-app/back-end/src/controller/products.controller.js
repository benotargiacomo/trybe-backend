const ProductService = require('../service/products.service');

const findAll = async (req, res, next) => {
  try {
    const result = await ProductService.findAll();

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { findAll };
