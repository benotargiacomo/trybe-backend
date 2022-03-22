import express from 'express';
import usersRouter from './routes/users';
import loginRouter from './routes/login';
import productsRouter from './routes/products';
import ordersRouter from './routes/orders';

const app = express();

app.use(express.json());

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

export default app;
