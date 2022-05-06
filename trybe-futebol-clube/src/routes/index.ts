import { Router } from 'express';
import 'express-async-errors';
import loginRouter from './login.route';
import teamsRouter from './teams.route';
import matchesRouter from './matches.route';
import leaderboardRouter from './leaderboard.route';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/teams', teamsRouter);
routes.use('/matches', matchesRouter);
routes.use('/leaderboard', leaderboardRouter);

export default routes;
