const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);

    return res.status(result.code).json(result.message);
  } catch (err) {
      return res.status(500).json({ message: 'Algo deu errado!' });
  }
};

const getAll = async (req, res) => {
  const { authorization } = req.headers;

  try {
    const result = await userService.getAll(authorization);

    return res.status(result.code).json(result.message);
  } catch (err) {
    return res.status(500).json({ message: 'Algo deu errado!' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  try {
    const result = await userService.getById(id, authorization);

    return res.status(result.code).json(result.message);
  } catch (err) {
    return res.status(500).json({ message: 'Algo deu errado!' });
  }
};

module.exports = {
  createUser,
  getAll,
  getById,
};