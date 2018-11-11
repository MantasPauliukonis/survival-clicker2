import { Action, Unlocks } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import { Effect } from '@/classes/game/base/modifiers';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
export class CheapStimulant extends Action {
  restoreStamina = new Effect({
    modifier: () => this.modifiers.character.staminaRestoreSpeed,
    duration: () => 5,
    value: () => new Decimal(5),
  });

  stomach = new Mutation(() => this.stats.character.stomach, () => {
    return new Decimal(1);
  });

  @Unlocks
  money = new Mutation(() => this.stats.finance.money, () => {
    return this.modifiers.finance.costAdd.value.mul(10).ceil().negated();
  });
}
