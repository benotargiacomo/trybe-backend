module.exports = (req, res, next) => {
  const { talk } = req.body;

  const emptyTalkMsg = { 
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  };

  if (!talk || talk === '') return res.status(400).json(emptyTalkMsg);

  next();
};