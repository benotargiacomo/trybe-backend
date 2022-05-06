import { Op } from 'sequelize';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import { Match, UpdateReq } from '../types';

class MatchesModel {
  static async getAll() {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  static async getByProgress(query: string) {
    const inProgress = query === 'true' ? 1 : 0;

    const matches = await Matches.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  static async matchTeams(...ids: number[]) {
    const teams = await Teams.findAll({
      where: {
        id: { [Op.or]: ids },
      },
    });

    if (teams.length === ids.length) return teams;

    return undefined;
  }

  static async addMatch(body: Match) {
    const match = await Matches.create({ ...body });

    return match;
  }

  static async updateMatch(id: string, body: UpdateReq) {
    const { homeTeamGoals, awayTeamGoals, inProgress } = body;

    if (inProgress === false) {
      const match = await Matches.update(
        { inProgress: false, homeTeamGoals, awayTeamGoals },
        { where: { id } },
      );

      return match;
    }

    const match = await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return match;
  }

  static async finishMatch(id: string) {
    const match = await Matches.update({ inProgress: false }, { where: { id } });

    return match;
  }
}

export default MatchesModel;
