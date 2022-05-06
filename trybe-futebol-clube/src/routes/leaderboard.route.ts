import { Router } from 'express';
import * as Controller from '../controllers';

const leaderboardRouter = Router();

leaderboardRouter.get('/away', Controller.Leaderboard.getAway);
leaderboardRouter.get('/home', Controller.Leaderboard.getHome);
leaderboardRouter.get('/', Controller.Leaderboard.getAll);

export default leaderboardRouter;
