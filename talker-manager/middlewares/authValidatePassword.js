module.exports = (req, res, next) => {
  const { password } = req.body;
    
  const emptyPwdMsg = { message: 'O campo "password" é obrigatório' };
  const invalidPwdMsg = { message: 'O "password" deve ter pelo menos 6 caracteres' };
  
  if (!password || password === '') return res.status(400).json(emptyPwdMsg);
  
  const validPwd = password.length >= 6;
  
  if (!validPwd) return res.status(400).json(invalidPwdMsg);

  next();
};