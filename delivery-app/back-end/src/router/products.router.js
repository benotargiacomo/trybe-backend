const express = require('express');
const validateToken = require('../middleware/validateToken');
const controller = require('../controller/products.controller');

const router = express.Router();

router
  .route('/')
  .get(
    validateToken,
    controller.findAll,
  );

module.exports = router;