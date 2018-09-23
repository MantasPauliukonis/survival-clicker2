import { Stats } from '@/classes/game/stats';
import { Processes } from '@/classes/game/processes';
import { StateNode } from '@/classes/game/base/state-node';

export class State extends StateNode {
  public stats = new Stats();
  public processes = new Processes();

  // For the time being
  constructor() {
    super();
    this.emitParent();
  }
}
