import { Router } from 'express';
import * as Controller from '../controllers';

const matchesRouter = Router();

matchesRouter.patch('/:id', Controller.Matches.updateMatch);
matchesRouter.patch('/:id/finish', Controller.Matches.finishMatch);
matchesRouter.get('/', Controller.Matches.getAll);
matchesRouter.post('/', Controller.Matches.addMatch);

export default matchesRouter;
