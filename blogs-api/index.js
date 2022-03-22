const express = require('express');
// const bodyParser = require('body-parser');

const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const categoryRouter = require('./routes/categoryRouter');

const app = express();

app.use(express.json());
// app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/post', postRouter);
app.use('/categories', categoryRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));