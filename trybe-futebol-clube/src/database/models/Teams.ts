import { DataTypes, Model } from 'sequelize';
import db from '.';

class Teams extends Model {
  public id: number;

  public teamName: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Teams',
  tableName: 'teams',
  underscored: true,
  timestamps: false,
});

export default Teams;
