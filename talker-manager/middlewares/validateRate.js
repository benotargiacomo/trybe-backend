module.exports = (req, res, next) => {
  const { talk: { rate } } = req.body;

  // const isValidNumber = Number.isInteger(rate);

  const wrongRateMsg = { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  const emptyTalkMsg = { 
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  };
  
  if (rate < 1 || rate > 5) return res.status(400).json(wrongRateMsg);
  if (!rate || rate === '') return res.status(400).json(emptyTalkMsg);

  next();
};