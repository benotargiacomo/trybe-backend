module.exports = (req, res, next) => {
  const { age } = req.body;

  const emptyAgeMsg = { message: 'O campo "age" é obrigatório' };
  const lowerAgeMsg = { message: 'A pessoa palestrante deve ser maior de idade' };

  if (!age || age === '') return res.status(400).json(emptyAgeMsg);
  if (age < 18) return res.status(400).json(lowerAgeMsg);
  
  next();
};