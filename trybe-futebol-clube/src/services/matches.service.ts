import { Match, UpdateReq } from '../types';
import * as Model from '../model';
import * as Validator from '../validators';
import HttpException from '../utils/HttpException';

class MatchesService {
  static async getAll() {
    const matches = await Model.Matches.getAll();

    return matches;
  }

  static async getByProgress(query: string) {
    const matches = await Model.Matches.getByProgress(query);

    return matches;
  }

  static async addMatch(body: Match) {
    const { homeTeam, awayTeam } = body;

    Validator.Matches.equalTeams(homeTeam, awayTeam);

    const teams = await Model.Matches.matchTeams(homeTeam, awayTeam);
    if (teams === undefined) throw new HttpException(404, 'There is no team with such id!');

    const match = await Model.Matches.addMatch(body);

    return match;
  }

  static async updateMatch(id: string, body: UpdateReq) {
    const match = await Model.Matches.updateMatch(id, body);

    return match;
  }

  static async finishMatch(id: string) {
    const match = await Model.Matches.finishMatch(id);

    return match;
  }
}

export default MatchesService;
