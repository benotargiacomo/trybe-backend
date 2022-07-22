const fs = require('fs');
const Jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');
  try {
    const tokenInfo = Jwt.verify(authorization, secret);
    const user = await User.findOne({ where: { email: tokenInfo.email } });

    if (!user) {
      return res.status(404).json({ error: 'Invalid Token!' });
    }

    req.user = user;
  } catch (err) {
    return res.status(409).json({ error: err.message });
  }

  return next(); 
};

module.exports = validateToken;