import { Request, Response } from 'express';
import * as Service from '../services';

class TeamsController {
  static async getAll(_req: Request, res: Response) {
    const result = await Service.Teams.getAll();

    return res.status(200).json(result);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;

    const result = await Service.Teams.getById(id);

    return res.status(200).json(result);
  }
}

export default TeamsController;
