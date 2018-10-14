import { Action } from '@/classes/game/base/processes';
import { Effect } from '@/classes/game/base/effects';
import Decimal from 'decimal.js';
import { SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit')
export class Janitor extends Action {
  public stamina = new Effect(() => this.stats.character.stamina, () => {
    return new Decimal(-5);
  });

  public money = new Effect(() => this.stats.finance.money, () => {
    return new Decimal(1);
  });
}
