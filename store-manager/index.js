const express = require('express');
const bodyParser = require('body-parser');

const salesRoute = require('./routes/salesRouter');
const productsRoute = require('./routes/productsRouter');

const app = express();

app.use(bodyParser.json());

require('dotenv').config();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoute);

app.use('/sales', salesRoute);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
