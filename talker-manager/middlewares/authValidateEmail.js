module.exports = (req, res, next) => {
  const { email } = req.body;
  
  const invalidMailMsg = { message: 'O "email" deve ter o formato "email@email.com"' };
  const emptyMailMsg = { message: 'O campo "email" é obrigatório' };
  
  if (!email || email === '') return res.status(400).json(emptyMailMsg);
  
  const validMail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email);
  
  if (!validMail) return res.status(400).json(invalidMailMsg);

  next();
};