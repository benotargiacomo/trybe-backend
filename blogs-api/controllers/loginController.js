const loginService = require('../services/loginService');

const authLogin = async (req, res) => {
  try {
    const result = await loginService.authLogin(req.body);

    return res.status(result.code).json(result.message);
  } catch (err) {
    console.log(err.message);

    return res.status(500).json({ message: 'Algo deu errado!' });
  }
};

module.exports = {
  authLogin,
};