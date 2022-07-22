const ServiceError = require('../error/ServiceError');

const validateSchema = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const [status, message] = error.message.split('|');

    next(new ServiceError(status, message));
  }

  next();
};

module.exports = validateSchema;
