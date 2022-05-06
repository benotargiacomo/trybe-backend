import { Request, Response } from 'express';
import * as Service from '../services';

class LeaderboardController {
  static async getAll(req: Request, res: Response) {
    const result = await Service.Leaderboard.getAll();

    return res.status(200).json(result);
  }

  static async getAway(req: Request, res: Response) {
    const result = await Service.Leaderboard.getAway();

    return res.status(200).json(result);
  }

  static async getHome(req: Request, res: Response) {
    const result = await Service.Leaderboard.getHome();

    return res.status(200).json(result);
  }
}

export default LeaderboardController;
