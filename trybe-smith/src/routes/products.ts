import { Router } from 'express';
import productsController from '../controllers/productsController';
import authToken from '../middlewares/authToken';

const productsRouter: Router = Router();

productsRouter.use(authToken);

productsRouter.post('/', productsController.addProduct);
productsRouter.get('/', productsController.listProducts);

export default productsRouter;
