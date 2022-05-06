import Teams from '../database/models/Teams';

class TeamsModel {
  static async getAll() {
    const teams = await Teams.findAll();

    return teams;
  }

  static async getById(id: string) {
    const team = await Teams.findByPk(id);

    return team;
  }
}

export default TeamsModel;
