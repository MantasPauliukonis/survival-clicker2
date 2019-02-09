import { IgnoreLimits } from '@/classes/game/base/processes';
import { StaminaAction } from '@/classes/game/base/actions';
import { Mutation } from '@/classes/game/base/mutations';
import Decimal from 'decimal.js';
import { TemperatureIncreaseMutation } from '@/classes/game/base/templates/mutations/temperature-increase-mutation';

export class Janitor extends StaminaAction {
  @IgnoreLimits('lessThanMinimum')
  stamina = new Mutation(() => this.stats.character.stamina, () => {
    return new Decimal(-5);
  });

  temperature = new TemperatureIncreaseMutation(() => this.stats.character.temperature, () => {
    return new Decimal(0.1);
  });

  money = new Mutation(() => this.stats.finance.money, () => {
    return new Decimal(5);
  });
}
