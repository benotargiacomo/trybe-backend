import { Router } from 'express';
import * as Controller from '../controllers';

const loginRouter = Router();

loginRouter.get('/validate', Controller.Login.validate);
loginRouter.post('/', Controller.Login.login);

export default loginRouter;
