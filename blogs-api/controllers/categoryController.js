const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const { authorization } = req.headers;
  const { name } = req.body;

  try {
    const result = await categoryService.createCategory(name, authorization);

    return res.status(result.code).json(result.message);
  } catch (err) {
    return res.status(500).json({ message: 'Algo deu errado!' });
  }
};

const getAll = async (req, res) => {
  const { authorization } = req.headers;

  try {
    const result = await categoryService.getAll(authorization);

    return res.status(result.code).json(result.message);
  } catch (err) {
    return res.status(500).json({ message: 'Algo deu errado!' });
  }
};

module.exports = {
  createCategory,
  getAll,
};