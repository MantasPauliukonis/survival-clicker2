import Decimal from 'decimal.js';
import { Mutation } from '@/classes/game/base/mutations/mutation';
import {
  ToggleAction,
  NoMultiplier,
  Persist,
  NoFavorites,
  Unlocks,
  CalculateBeforeToggle,
} from '@/classes/game/base/actions';

@NoMultiplier
@Persist
@NoFavorites
@CalculateBeforeToggle
export class Favorites extends ToggleAction {
  @Unlocks
  points = new Mutation(() => this.stats.incarnation.points, () => {
    if (this.timesCalculated.greaterThan(0)) {
      return new Decimal(0);
    }

    return new Decimal(-75);
  });

  get canToggleOff() {
    if (!this.actions.incarnation.automation.interaction.queue.isToggledOn) {
      return super.canToggleOff;
    }

    return false;
  }
}
