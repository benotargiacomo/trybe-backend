import Archetype from './Archetypes';
import { EnergyType } from '../Energy';

class Warrior extends Archetype {
  private _energyType: EnergyType;
  private static _warriorInstances = 0;

  constructor(name: string) {
    super(name);
    this._energyType = 'stamina';

    Warrior.addInstance();
  }

  private static addInstance() {
    this._warriorInstances += 1;
  }

  get energyType(): EnergyType { return this._energyType; }

  static createdArchetypeInstances(): number {
    return this._warriorInstances;
  }
}

export default Warrior;