const { User } = require('../models');
const auth = require('../auth/token');
const validation = require('../middlewares/validations');

const createUser = async (body) => {
  const validateBodyRequest = validation.createUser(body);
  if (validateBodyRequest.message) return validateBodyRequest; 

  try {
    await User.create(body);
  } catch (err) {
    return validation.errors.userRegistered;
  }

  const token = auth.sign(body);

  return { code: 201, message: { token } };
};

const getAll = async (authorization) => {
  const validateToken = validation.authToken(authorization);
  if (validateToken.message) return validateToken;

  try {
    const users = await User.findAll({
      attributes: ['id', 'displayName', 'email', 'image'],
    });

    return { code: 200, message: users };
  } catch (err) {
    console.log(err);
  }
};

const getById = async (id, authorization) => {
  const validateToken = validation.authToken(authorization);
  if (validateToken.message) return validateToken;
  
  try {
    const user = await User.findByPk(id, {
      attributes: ['id', 'displayName', 'email', 'image'],
    });
    if (user === null) return validation.errors.userNotFound;

    return { code: 200, message: user };
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  createUser,
  getAll,
  getById,
};