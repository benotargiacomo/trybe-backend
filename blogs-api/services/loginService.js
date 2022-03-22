const validation = require('../middlewares/validations');
const { User } = require('../models');
const auth = require('../auth/token');

const authLogin = async (body) => {
  const { email } = body;

  const validateBodyRequest = await validation.authLogin(body);
  if (validateBodyRequest.message) return validateBodyRequest;
  
  try {
    const userEmail = await User.findOne({ where: { email } });

    if (userEmail === null) return validation.errors.invalidUser;
  } catch (err) {
    console.log(err.message);
  }

  const token = auth.sign(body);

  return { code: 200, message: { token } };
};

module.exports = {
  authLogin,
};