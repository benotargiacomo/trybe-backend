const express = require('express');
const validateSchema = require('../middleware/validateSchema');
const validateToken = require('../middleware/validateToken');
const userSchema = require('../schema/userSchema');
const controller = require('../controller/user.controller');

const router = express.Router();

router
  .route('/')
  .get(
    validateToken,
    controller.findUsersByRole,
  )
  .post(
    validateSchema(userSchema.create),
    controller.create,
  );

  router
  .route('/users')
  .get(
    controller.allUsers,
  );
  
  router
  .route('/:id')
  .delete(
    controller.deleteUser,
  );

router
  .route('/login')
  .post(
    validateSchema(userSchema.login),
    controller.login,
  );

module.exports = router;