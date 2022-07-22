const UserService = require('../service/user.service');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.login({ email, password });

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const allUsers = async (_req, res, next) => {
  try {
    const result = await UserService.allUsers();

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await UserService.deleteUser(Number(id));

    return res.status(204).json(result);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await UserService.create(req.body);

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const findUsersByRole = async (req, res, next) => {
  try {
    const { role } = req.query;
    const result = await UserService.findUsersByRole(role);

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { login, create, findUsersByRole, allUsers, deleteUser };
