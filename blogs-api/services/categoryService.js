const { Category } = require('../models');
const validation = require('../middlewares/validations');

const createCategory = async (name, authorization) => {
  const validateToken = validation.authToken(authorization);
  if (validateToken.message) return validateToken;

  const validateCategory = validation.validateCategory(name);
  if (validateCategory.message) return validateCategory;

  try {
    const createdCategory = await Category.create({ name });

    return { code: 201, message: createdCategory };
  } catch (err) {
    console.log(err.message);
  }
};

const getAll = async (authorization) => {
  const validateToken = validation.authToken(authorization);
  if (validateToken.message) return validateToken;

  try {
    const categories = await Category.findAll();

    return { code: 200, message: categories };
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  createCategory,
  getAll,
};