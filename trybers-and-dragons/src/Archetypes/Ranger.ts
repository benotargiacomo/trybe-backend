import Archetype from './Archetypes';
import { EnergyType } from '../Energy';

class Ranger extends Archetype {
  private _energyType: EnergyType;
  private static _rangerInstances = 0;

  constructor(name: string) {
    super(name);
    this._energyType = 'stamina';

    Ranger.addInstance();
  }

  private static addInstance() {
    this._rangerInstances += 1;
  }

  get energyType(): EnergyType { return this._energyType; }

  static createdArchetypeInstances(): number {
    return this._rangerInstances;
  }
}

export default Ranger;