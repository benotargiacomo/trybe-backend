import * as Model from '../model';

class TeamsService {
  static async getAll() {
    const teams = await Model.Teams.getAll();

    return teams;
  }

  static async getById(id: string) {
    const team = await Model.Teams.getById(id);

    return team;
  }
}

export default TeamsService;
