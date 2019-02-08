import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { ToggleAction } from '@/classes/game/base/actions';

export class Underwear extends ToggleAction {
  money = new Mutation(() => this.stats.finance.money, () => {
    if (this.timesCalculated.greaterThan(0)) {
      return new Decimal(0);
    }

    return this.helpers.moneyCost(5);
  });
}
