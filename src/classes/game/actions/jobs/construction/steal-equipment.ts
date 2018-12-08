import { IgnoreLimits } from '@/classes/game/base/processes';
import { Action, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';

@UnlocksWhen(action => action.modifiers.education.informationTechnology.value.greaterThanOrEqualTo(3))
export class StealEquipment extends Action {
  @IgnoreLimits('lessThanMinimum')
  stamina = new Mutation(() => this.stats.character.stamina, () => {
    return new Decimal(-30);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(150).mul(this.modifiers.education.informationTechnology.value.minus(2));
  });
}
