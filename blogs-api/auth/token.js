require('dotenv').config();
const jwt = require('jsonwebtoken');

const sign = (data) => {
  const { JWT_SECRET } = process.env;
  const JWT_CONFIG = { algorithm: 'HS256', expiresIn: '7d' };

  const token = jwt.sign(data, JWT_SECRET, JWT_CONFIG);

  return token;
};

const verify = (token) => {
  const { JWT_SECRET } = process.env;

  try {
    const isValid = jwt.verify(token, JWT_SECRET);

    return isValid;
  } catch (err) {
    console.log(err.message);

    return false;
  }
};

module.exports = {
  sign,
  verify,
};