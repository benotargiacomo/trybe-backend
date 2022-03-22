import { Router } from 'express';
import usersController from '../controllers/usersController';

const usersRouter: Router = Router();

usersRouter.post('/', usersController.addUser);

export default usersRouter;