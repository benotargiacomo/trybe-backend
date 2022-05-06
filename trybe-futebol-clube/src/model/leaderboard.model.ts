import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import { TeamMatches } from '../types';

class LeaderboardModel {
  static async getAll() {
    const leaderboard = await Teams.findAll({
      attributes: { exclude: ['id'] },
      order: ['id'],
      include: [
        { model: Matches,
          as: 'teamHome',
          where: { inProgress: 0 },
          attributes: ['homeTeamGoals', 'awayTeamGoals'] },
        { model: Matches,
          as: 'teamAway',
          where: { inProgress: 0 },
          attributes: ['homeTeamGoals', 'awayTeamGoals'] },
      ],
    });

    return leaderboard as unknown as TeamMatches[];
  }
}

export default LeaderboardModel;
