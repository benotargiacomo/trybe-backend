const Joi = require('joi');

const login = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': '400|"email" is required',
    'string.base': '400|"email" must be a string',
    'string.empty': '400|"email" can\'t be empty',
    'string.email': '400|"email" must have an email format',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': '400|"password" is required',
    'string.base': '400|"password" must be a string',
    'string.empty': '400|"password" can\'t be empty',
    'string.min': '400|"password" can\'t be lower than 6 caracteres',
  }),
});

const create = Joi.object({
  name: Joi.string().required().messages({
    'any.required': '400|"name" is required',
    'string.base': '400|"name" must be a string',
    'string.empty': '400|"name" can\'t be empty',
  }),
  email: Joi.string().email().required().messages({
    'any.required': '400|"email" is required',
    'string.base': '400|"email" must be a string',
    'string.empty': '400|"email" can\'t be empty',
    'string.email': '400|"email" must have an email format',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': '400|"password" is required',
    'string.base': '400|"password" must be a string',
    'string.empty': '400|"password" can\'t be empty',
    'string.min': '400|"password" can\'t be lower than 6 caracteres',
  }),
  role: Joi.string().required().messages({
    'any.required': '400|"role" is required',
    'string.base': '400|"role" must be a string',
    'string.empty': '400|"role" can\'t be empty',
  }),
});

module.exports = { create, login };
