const Joi = require('joi');

const create = Joi.object({
  totalPrice: Joi.number().positive().required().messages({
    'any.required': '400|"totalPrice" is required',
    'number.base': '400|"totalPrice" is a number',
    'number.positive': '400|"totalPrice" is a positive number',
  }),
  userId: Joi.number().positive().required().messages({
    'any.required': '400|"userId" is required',
    'number.base': '400|"userId" is a number',
    'number.positive': '400|"userId" is a positive number',
  }),
  sellerId: Joi.number().positive().required().messages({
    'any.required': '400|"sellerId" is required',
    'number.base': '400|"sellerId" is a number',
    'number.positive': '400|"sellerId" is a positive number',
  }),
  deliveryAddress: Joi.string().required().messages({
    'any.required': '400|"deliveryAddress" is required',
    'string.base': '400|"deliveryAddress" must be a string',
    'string.empty': '400|"deliveryAddress" can\'t be empty',
  }),
  deliveryNumber: Joi.string().required().messages({
    'any.required': '400|"deliveryNumber" is required',
    'string.base': '400|"deliveryNumber" must be a string',
    'string.empty': '400|"deliveryNumber" can\'t be empty',
  }),
  // saleDate: Joi.string().required().messages({
  //   'any.required': '400|"saleDate" is required',
  //   'string.base': '400|"saleDate" must be a string',
  //   'string.empty': '400|"saleDate" can\'t be empty',
  // }),
  status: Joi.string().required().messages({
    'any.required': '400|"status" is required',
    'string.base': '400|"status" must be a string',
    'string.empty': '400|"status" can\'t be empty',
  }),
  products: Joi.array().required().items(Joi.object({
    productId: Joi.number().positive().required().messages({
      'any.required': '400|"productId" is required',
      'number.base': '400|"productId" is a number',
      'number.positive': '400|"productId" is a positive number',
    }),
    quantity: Joi.number().positive().required().messages({
      'any.required': '400|"quantity" is required',
      'number.base': '400|"quantity" is a number',
      'number.positive': '400|"quantity" is a positive number',
    }),
  })),
});

const update = Joi.object({
  id: Joi.number().positive().required().messages({
    'any.required': '400|"userId" is required',
    'number.base': '400|"userId" is a number',
    'number.positive': '400|"userId" is a positive number',
  }),
  status: Joi.string().required().messages({
    'any.required': '400|"status" is required',
    'string.base': '400|"status" must be a string',
    'string.empty': '400|"status" can\'t be empty',
  }),
});

module.exports = { update, create };
