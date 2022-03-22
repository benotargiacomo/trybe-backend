module.exports = (req, res, next) => {
  const { name } = req.body;

  const emptyNameMsg = { message: 'O campo "name" é obrigatório' };
  const lengthNameMsg = { message: 'O "name" deve ter pelo menos 3 caracteres' };

  if (!name || name === '') return res.status(400).json(emptyNameMsg);
  if (name.length < 3) return res.status(400).json(lengthNameMsg);
  
  next();
};