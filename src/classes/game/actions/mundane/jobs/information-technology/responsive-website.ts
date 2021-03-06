import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@UnlocksWhen(action => action.modifiers.education.informationTechnology.value.greaterThanOrEqualTo(3))
export class ResponsiveWebsite extends Action {
  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-5).div(this.modifiers.character.concentration.value);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(100).mul(this.modifiers.education.informationTechnology.value.minus(2));
  });
}
