const express = require('express');
const bodyParser = require('body-parser');

const talker = require('./middlewares/talker');
const talkerID = require('./middlewares/talkerID');
const validateEmail = require('./middlewares/authValidateEmail');
const validatePassword = require('./middlewares/authValidatePassword');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateTalk = require('./middlewares/validateTalk');
const tokenGenerator = require('./middlewares/tokenGenerator');
const createTalker = require('./middlewares/createTalker');
const validateRate = require('./middlewares/validateRate');
const validateWatched = require('./middlewares/validateWatched');
const validateToken = require('./middlewares/authValidateToken');
const editTalker = require('./middlewares/editTalker');
const deleteTalker = require('./middlewares/deleteTalker');
const searchTalker = require('./middlewares/searchTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talker);
app.get('/talker/search', validateToken, searchTalker);
app.get('/talker/:id', talkerID);

app.post('/login', validateEmail, validatePassword, tokenGenerator);
app.post('/talker', validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatched,
  createTalker);

app.put('/talker/:id', validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatched,
  editTalker);

app.delete('/talker/:id', validateToken, deleteTalker);

app.listen(PORT, () => {
  console.log('Online');
});
