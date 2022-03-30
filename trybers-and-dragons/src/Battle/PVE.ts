import Fighter, { SimpleFighter } from '../Fighter';
import Battle from './Battle';

class PVE extends Battle {
  private _player: Fighter;
  private _monsters: Fighter[] | SimpleFighter[];
  
  constructor(player: Fighter, monsters: Fighter[] | SimpleFighter[]) {
    super(player);

    this._player = player;
    this._monsters = monsters;
  }

  fight(): number {
    while (this._player.lifePoints !== -1
      && this._monsters.some((monster) => monster.lifePoints !== -1)) {
      this._monsters.forEach((monster) => {
        this._player.attack(monster);
        monster.attack(this._player);
      });
    }

    return super.fight();
  }
}

export default PVE;