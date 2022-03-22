module.exports = (req, res, next) => {
  const { authorization: token } = req.headers;
  // const hash = '7mqaVRXJSp886CGr';

  const emptyTokenMsg = { message: 'Token não encontrado' };
  const invalidTokenMsg = { message: 'Token inválido' };

  if (!token || token === '') return res.status(401).json(emptyTokenMsg);
  if (token.length !== 16) return res.status(401).json(invalidTokenMsg);

  next();
};
