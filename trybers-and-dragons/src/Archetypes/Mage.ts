import Archetype from './Archetypes';
import { EnergyType } from '../Energy';

class Mage extends Archetype {
  private _energyType: EnergyType;
  private static _mageInstances = 0;

  constructor(name: string) {
    super(name);
    this._energyType = 'mana';

    Mage.addInstance();
  }

  private static addInstance() {
    this._mageInstances += 1;
  }

  get energyType(): EnergyType { return this._energyType; }

  static createdArchetypeInstances(): number {
    return this._mageInstances;
  }
}

export default Mage;