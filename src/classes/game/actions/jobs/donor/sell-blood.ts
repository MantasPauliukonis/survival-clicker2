import { Action } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import { SerializeAllOn } from '@/classes/game/base/serialization';
import Decimal from 'decimal.js';

@SerializeAllOn('emit')
export class SellBlood extends Action {
  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(100).times(this.stats.character.health.level).floor();
  });

  health = new Mutation(() => this.stats.character.health, () => {
    return new Decimal(-30);
  });
}
