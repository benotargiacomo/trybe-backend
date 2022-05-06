import { HomeAway, TeamMatches, TeamStats } from '../types';

class Performance {
  private _name: string;

  private _totalPoints: HomeAway;

  private _totalGames: HomeAway;

  private _totalVictories: HomeAway;

  private _totalDraws: HomeAway;

  private _totalLosses: HomeAway;

  private _goalsFavor: HomeAway;

  private _goalsOwn: HomeAway;

  private _goalsBalance: HomeAway;

  private _efficiency: HomeAway & { total: number };

  constructor(team: TeamMatches) {
    this._name = team.teamName;
    this._totalGames = { home: 0, away: 0, total: 0 };
    this._totalPoints = { home: 0, away: 0, total: 0 };
    this._totalVictories = { home: 0, away: 0, total: 0 };
    this._totalLosses = { home: 0, away: 0, total: 0 };
    this._totalDraws = { home: 0, away: 0, total: 0 };
    this._goalsFavor = { home: 0, away: 0, total: 0 };
    this._goalsOwn = { home: 0, away: 0, total: 0 };
    this._goalsBalance = { home: 0, away: 0, total: 0 };
    this._efficiency = { home: 0, away: 0, total: 0 };

    this.victories(team);
    this.losses(team);
    this.draws(team);

    this.gamePoints();
    this.balance();
    this.percentage();
  }

  private victories({ teamHome, teamAway }: TeamMatches) {
    teamHome.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) {
        this._totalVictories.total += 1;
        this._totalVictories.home += 1;
        this._goalsFavor.home += homeTeamGoals;
        this._goalsOwn.home += awayTeamGoals;
      }
    });

    teamAway.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals < awayTeamGoals) {
        this._totalVictories.total += 1;
        this._totalVictories.away += 1;
        this._goalsFavor.away += awayTeamGoals;
        this._goalsOwn.away += homeTeamGoals;
      }
    });
  }

  private losses({ teamHome, teamAway }: TeamMatches) {
    teamHome.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals < awayTeamGoals) {
        this._totalLosses.total += 1;
        this._totalLosses.home += 1;
        this._goalsFavor.home += homeTeamGoals;
        this._goalsOwn.home += awayTeamGoals;
      }
    });

    teamAway.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) {
        this._totalLosses.total += 1;
        this._totalLosses.away += 1;
        this._goalsFavor.away += awayTeamGoals;
        this._goalsOwn.away += homeTeamGoals;
      }
    });
  }

  private draws({ teamHome, teamAway }: TeamMatches) {
    teamHome.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals === awayTeamGoals) {
        this._totalDraws.total += 1;
        this._totalDraws.home += 1;
        this._goalsFavor.home += homeTeamGoals;
        this._goalsOwn.home += awayTeamGoals;
      }
    });

    teamAway.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals === awayTeamGoals) {
        this._totalDraws.total += 1;
        this._totalDraws.away += 1;
        this._goalsFavor.away += awayTeamGoals;
        this._goalsOwn.away += homeTeamGoals;
      }
    });
  }

  private gamePoints() {
    const homeGames = this._totalVictories.home + this._totalLosses.home + this._totalDraws.home;
    const awayGames = this._totalVictories.away + this._totalLosses.away + this._totalDraws.away;

    this._totalGames.home = homeGames;
    this._totalGames.away = awayGames;
    this._totalGames.total = homeGames + awayGames;

    const homePoints = (this._totalVictories.home * 3) + this._totalDraws.home;
    const awayPoints = (this._totalVictories.away * 3) + this._totalDraws.away;

    this._totalPoints.home = homePoints;
    this._totalPoints.away = awayPoints;
    this._totalPoints.total = homePoints + awayPoints;
  }

  private balance() {
    const goalsFavor = this._goalsFavor.home + this._goalsFavor.away;
    const goalsOwn = this._goalsOwn.home + this._goalsOwn.away;

    this._goalsFavor.total = goalsFavor;
    this._goalsOwn.total = goalsOwn;

    const homeBalance = this._goalsFavor.home - this._goalsOwn.home;
    const awayBalance = this._goalsFavor.away - this._goalsOwn.away;

    this._goalsBalance.home = homeBalance;
    this._goalsBalance.away = awayBalance;
    this._goalsBalance.total = homeBalance + awayBalance;
  }

  private percentage() {
    const homeEfficiency = (this._totalPoints.home / (this._totalGames.home * 3)) * 100;
    const awayEfficiency = (this._totalPoints.away / (this._totalGames.away * 3)) * 100;

    const totalPoints = this._totalPoints.home + this._totalPoints.away;
    const totalGames = this._totalGames.home + this._totalGames.away;

    const totalEfficiency = (totalPoints / (totalGames * 3)) * 100;

    this._efficiency.home = Number(homeEfficiency.toFixed(2));
    this._efficiency.away = Number(awayEfficiency.toFixed(2));
    this._efficiency.total = Number(totalEfficiency.toFixed(2));
  }

  performance(local: 'home' | 'away' | 'total'): TeamStats {
    return {
      name: this._name,
      totalGames: this._totalGames[local],
      totalPoints: this._totalPoints[local],
      totalVictories: this._totalVictories[local],
      totalLosses: this._totalLosses[local],
      totalDraws: this._totalDraws[local],
      goalsFavor: this._goalsFavor[local],
      goalsOwn: this._goalsOwn[local],
      goalsBalance: this._goalsBalance[local],
      efficiency: this._efficiency[local],
    };
  }
}

export default Performance;
