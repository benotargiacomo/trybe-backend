import * as Model from '../model';
import Performance from '../utils/Performance';
import Parse from '../utils/Parse';
import { TeamStats } from '../types';

class LeaderboardService {
  static async getAll() {
    const leaderboard = await Model.Leaderboard.getAll();

    const result = [] as TeamStats[];

    leaderboard.forEach((stats) => {
      const parse = new Performance(stats).performance('total');

      result.push(parse);
    });

    result.sort(Parse.teamsSort(
      'totalPoints',
      'totalVictories',
      'goalsBalance',
      'goalsFavor',
      'goalsOwn',
    ));

    return result;
  }

  static async getAway() {
    const leaderboard = await Model.Leaderboard.getAll();

    const result = [] as TeamStats[];

    leaderboard.forEach((stats) => {
      const parse = new Performance(stats).performance('away');

      result.push(parse);
    });

    result.sort(Parse.teamsSort(
      'totalPoints',
      'totalVictories',
      'goalsBalance',
      'goalsFavor',
      'goalsOwn',
    ));

    return result;
  }

  static async getHome() {
    const leaderboard = await Model.Leaderboard.getAll();

    const result = [] as TeamStats[];

    leaderboard.forEach((stats) => {
      const parse = new Performance(stats).performance('home');

      result.push(parse);
    });

    result.sort(Parse.teamsSort(
      'totalPoints',
      'totalVictories',
      'goalsBalance',
      'goalsFavor',
      'goalsOwn',
    ));

    return result;
  }
}

export default LeaderboardService;
