import { TeamStats } from '../types';

class Parse {
  static teamsSort(...prop: string[]) {
    return (objectA: TeamStats, objectB: TeamStats): number => {
      const a = objectA[prop[0] as keyof typeof objectA];
      const b = objectB[prop[0] as keyof typeof objectB];

      if (a < b) return 1;
      if (a > b) return -1;

      if (prop.length > 1) return Parse.teamsSort(...prop.slice(1))(objectA, objectB);

      return 0;
    };
  }
}

export default Parse;
