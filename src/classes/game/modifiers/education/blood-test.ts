import { Modifier } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

export class BloodTest extends Modifier {
  compute() {
    return new Decimal(0).add(this.actions.mundane.education.courses.bloodTest.timesCalculated);
  }
}
