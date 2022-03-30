import Archetype from './Archetypes';
import { EnergyType } from '../Energy';

class Necromancer extends Archetype {
  private _energyType: EnergyType;
  private static _necroInstances = 0;

  constructor(name: string) {
    super(name);
    this._energyType = 'mana';

    Necromancer.addInstance();
  }

  private static addInstance() {
    this._necroInstances += 1;
  }

  get energyType(): EnergyType { return this._energyType; }

  static createdArchetypeInstances(): number {
    return this._necroInstances;
  }
}

export default Necromancer;