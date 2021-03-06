import { Action } from '.';
import { SerializeOn } from '@/classes/game/base/serialization';
import { Transform } from '@/classes/game/base/transformable';

export class ToggleAction extends Action {
  static autoWhenToggled: boolean = false;
  static calculateBeforeToggle: boolean = false;

  'constructor': typeof ToggleAction;

  @SerializeOn('emit', 'store')
  @Transform<undefined, ToggleAction>('reset', () => undefined, action => !action.constructor.isPersistent)
  isToggledOn?: boolean;

  onClock() {
    super.onClock();
    this.triggerAuto();
  }

  toggleOn() {
    this.isToggledOn = true;
    this.onToggleOn();
  }

  toggleOff() {
    this.isToggledOn = false;
    this.onToggleOff();
  }

  @SerializeOn('emit')
  get isAutoWhenToggled() {
    return this.constructor.autoWhenToggled;
  }

  @SerializeOn('emit')
  get canToggleOn(): boolean {
    if (this.constructor.calculateBeforeToggle && !this.isCalculatedOnce) {
      return false;
    }
    return !this.isToggledOn;
  }

  @SerializeOn('emit')
  get canToggleOff(): boolean {
    return this.isToggledOn !== undefined && this.isToggledOn;
  }

  @SerializeOn('emit')
  get isTogglable(): true | undefined {
    return true;
  }

  @SerializeOn('emit')
  get isCalculableBeforeToggle() {
    return this.constructor.calculateBeforeToggle && !this.isCalculatedOnce;
  }

  protected triggerAuto() {
    const multiplier = this.state.timeMultiplier;
    if (this.isAutoWhenToggled && this.isToggledOn) {
      if (this.validate({ multiplier })) {
        this.calculate({ multiplier });
      }
    }
  }

  protected onToggleOn(): void {
    //
  }

  protected onToggleOff(): void {
    //
  }
}
