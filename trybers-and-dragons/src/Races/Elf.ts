import Race from './Race';

class Elf extends Race {
  private _maxLifePoints: number;
  private static _elfInstances = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    this._maxLifePoints = 99;

    Elf.addInstance();
  }

  private static addInstance() {
    this._elfInstances += 1;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;    
  }

  static createdRacesInstances(): number {
    return this._elfInstances;
  }
}

export default Elf;