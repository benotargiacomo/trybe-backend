const crypto = require('crypto');

module.exports = (req, res) => {
  const { email, password } = req.body;
  
  const userData = email + password;
  const hash = crypto.createHash('sha256', userData).digest('hex');
  const token = hash.slice(0, 16);

  res.status(200).send({ token });
};