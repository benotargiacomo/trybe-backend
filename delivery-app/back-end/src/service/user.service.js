const md5 = require('md5');
const fs = require('fs');
const Jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const ServiceError = require('../error/ServiceError');
const { User } = require('../database/models');
const removeKey = require('../utils/removeKey');
require('dotenv').config();

const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');
const jwtOptions = {
  expiresIn: '24h',
  algorithm: 'HS256',
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new ServiceError(404, 'Invalid Login!');
  }

  const hashPass = md5(password);
  if (user.password !== hashPass) {
    throw new ServiceError(404, 'Invalid Login!');
  }

  const token = Jwt.sign({ email, password: hashPass }, secret, jwtOptions);

  return { id: user.id, email, role: user.role, name: user.name, token };
};

const allUsers = async () => {
  const { Op } = Sequelize;
  const users = await User.findAll({
     where: { role: { [Op.not]: 'administrator' } },
     attributes: { exclude: ['password'] },
    });

  return users;
};

const deleteUser = async (id) => {
  const users = await User.destroy({
    where: { id },
  });
  console.log('aq');
  return users;
};

const create = async (payload) => {
  const userExists = await User.findAll({
    where: { email: payload.email },
   });

  if (userExists.length !== 0) {
    throw new ServiceError(409, 'User already exists!');
  }

  const hashPass = md5(payload.password);
  const newPayload = removeKey(payload, 'password');

  await User.create({ ...newPayload, password: hashPass });

  return newPayload;
};

const findUsersByRole = async (role) => {
  if (!role) {
    throw new ServiceError(404, 'Missing role query');
  }

  const users = await User.findAll(
    { 
      where: { role },
      attributes: { exclude: ['password'] },
    },
  );

  return users;
};

module.exports = { login, create, findUsersByRole, allUsers, deleteUser };