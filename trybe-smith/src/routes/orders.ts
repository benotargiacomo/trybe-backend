import { Router } from 'express';
import ordersController from '../controllers/ordersController';
import authToken from '../middlewares/authToken';

const ordersRouter: Router = Router();

ordersRouter.use(authToken);

ordersRouter.get('/', ordersController.getOrders);
ordersRouter.get('/:id', ordersController.getOrderById);
ordersRouter.post('/', ordersController.addOrder);

export default ordersRouter;