const express = require('express');
const cors = require('cors');
const path = require('path');
const error = require('../error/error');

// Routers
const userRouter = require('../router/user.router');
const productRouter = require('../router/products.router');
const saleRouter = require('../router/sales.router');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/', express.static(path.resolve(__dirname, '..')));
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/sale', saleRouter);
app.use(error);

module.exports = app;
