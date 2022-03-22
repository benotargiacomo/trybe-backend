module.exports = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  const validData = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([12][0-9]{3})$/g.test(watchedAt);
  
  const wrongDataMsg = { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  const emptyTalkMsg = { 
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  };

  if (!watchedAt || watchedAt === '') return res.status(400).json(emptyTalkMsg);
  if (!validData) return res.status(400).json(wrongDataMsg);

  next();
};