import { Container } from '@/classes/game/base/stats';
import Decimal from 'decimal.js';

export class Energy extends Container {
  public readonly default = 100;

  get maximum() {
    return new Decimal(100);
  }
}
