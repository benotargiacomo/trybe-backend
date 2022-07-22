const express = require('express');
const validateToken = require('../middleware/validateToken');
const validateSchema = require('../middleware/validateSchema');
const salesSchema = require('../schema/salesSchema');
const controller = require('../controller/sales.controller');

const router = express.Router();

router
  .route('/')
  .get(
    validateToken,
    controller.findAll,
  )
  .patch(
    validateToken,
    validateSchema(salesSchema.update),
    controller.update,
  )
  .post(
    validateToken,
    validateSchema(salesSchema.create),
    controller.create,
  );

router
.route('/:id')
.get(
  validateToken,
  controller.findOne,
);

module.exports = router;