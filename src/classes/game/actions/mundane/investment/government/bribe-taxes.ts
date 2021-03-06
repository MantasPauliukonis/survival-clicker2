import { Action, Unlocks, NoMultiplier, UnlocksWhen } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
@NoMultiplier
@UnlocksWhen(process => !!process.actions.incarnation.modules.finance.taxes.isToggledOn)
export class BribeTaxes extends Action {
  @Unlocks
  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(-1000).mul(this.timesCalculated.add(1));
  });

  investment = new Mutation(() => this.stats.finance.taxes, () => {
    return new Decimal(-0.1);
  });
}
