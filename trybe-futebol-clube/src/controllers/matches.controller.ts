import { Request, Response } from 'express';
import * as Validator from '../validators';
import * as Service from '../services';

class MatchesController {
  static async getAll(req: Request, res: Response) {
    const { inProgress }: { inProgress?: string } = req.query;

    const query = Validator.Matches.query(inProgress);

    if (query === undefined) {
      const result = await Service.Matches.getAll();

      return res.status(200).json(result);
    }

    const result = await Service.Matches.getByProgress(query);

    return res.status(200).json(result);
  }

  static async addMatch(req: Request, res: Response) {
    const { authorization } = req.headers;

    Validator.Token.verify(authorization);

    const result = await Service.Matches.addMatch(req.body);

    return res.status(201).json(result);
  }

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    const result = await Service.Matches.finishMatch(id);

    return res.status(200).json(result);
  }

  static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;

    const result = await Service.Matches.updateMatch(id, req.body);

    return res.status(200).json(result);
  }
}

export default MatchesController;
