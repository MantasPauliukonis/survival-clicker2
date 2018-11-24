import { Action, UnlocksWhen, VisibleWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@UnlocksWhen(action => action.stats.education.informationTechnology.value.greaterThan(0))
@VisibleWhen(action => action.stats.education.informationTechnology.value.lessThan(3))
export class CraftJankyWebsite extends Action {
  energy = new Mutation(() => this.stats.character.energy, () => {
    return new Decimal(-5).div(this.modifiers.character.concentration.value);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(20).mul(this.stats.education.informationTechnology.value);
  });
}
