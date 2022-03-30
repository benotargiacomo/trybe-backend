import SimpleFighter from './SimpleFighter';
import Energy from '../Energy';

interface Fighter extends SimpleFighter {
  defense: number;
  energy?: Energy;
  attack(enemy: Fighter | SimpleFighter): void;
  special(enemy: Fighter | SimpleFighter): void;
  levelUp(): void;
}

export default Fighter;
