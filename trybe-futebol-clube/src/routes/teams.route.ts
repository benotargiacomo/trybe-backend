import { Router } from 'express';
import * as Controller from '../controllers';

const teamsRouter = Router();

teamsRouter.get('/:id', Controller.Teams.getById);
teamsRouter.get('/', Controller.Teams.getAll);

export default teamsRouter;
