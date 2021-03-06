import { ToggleAction } from '.';
import { traverse } from '@/utils/node';
import { NoMultiplier } from './decorators';

@NoMultiplier
export class ClothingAction extends ToggleAction {
  onToggleOn() {
    for (const action of this.clothingActions()) {
      if (action !== this && action.isToggledOn && action.canToggleOff) {
        action.toggleOff();
      }
    }
  }

  private *clothingActions(): IterableIterator<ClothingAction> {
    for (const node of traverse(this.actions.mundane.clothing)) {
      if (node instanceof ClothingAction) {
        yield node;
      }
    }
  }
}
