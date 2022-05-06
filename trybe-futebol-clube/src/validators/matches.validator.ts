import HttpException from '../utils/HttpException';

const matchesValidator = {
  query(query?: string) {
    if (query === 'true' || query === 'false') return query;

    return undefined;
  },
  equalTeams(homeTeam: number, awayTeam: number) {
    if (homeTeam === awayTeam) {
      throw new HttpException(401, 'It is not possible to create a match with two equal teams');
    }
  },
};

export default matchesValidator;
