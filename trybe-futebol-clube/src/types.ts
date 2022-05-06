export type LoginReq = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  username: string;
  role: string;
  email: string;
  password?: string;
};

export type Team = {
  id: number;
  teamName: string;
};

export type Match = {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
};

export type UpdateReq = {
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?: boolean;
};

export type TeamGoals = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};

export type TeamMatches = {
  teamName: string;
  teamHome: TeamGoals[];
  teamAway: TeamGoals[];
};

export type TeamStats = {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
};

export type HomeAway = {
  home: number;
  away: number;
  total: number;
};
