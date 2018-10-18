import { Action } from '@/classes/game/base/processes';
import { Effect } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';
import { SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit')
export class CheapWater extends Action {
  hydration = new Effect(() => this.stats.character.hydration, () => {
    return new Decimal(1);
  });

  stomach = new Effect(() => this.stats.character.stomach, () => {
    return new Decimal(1);
  });

  money = new Effect(() => this.stats.finance.money, () => {
    return new Decimal(-1);
  });
}