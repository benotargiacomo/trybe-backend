import { Router } from 'express';
import loginController from '../controllers/loginController';

const loginRouter: Router = Router();

loginRouter.post('/', loginController.signIn);

export default loginRouter;