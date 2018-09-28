import { Calculable } from '@/classes/game/base/processes/mutation';
import { SerializableWithReference } from '@/classes/game/base/serialization';
import { Mutation } from './mutation';
import { Effect } from '@/classes/game/base/effects';

export enum ProcessType {
    Manual = 'manual',
    Auto = 'auto',
}

export abstract class Process extends SerializableWithReference {
  public static type: ProcessType = ProcessType.Manual;
  public 'constructor': typeof Process;

  public validate(): boolean {
    return true;
  }

  public run() {
    for (const effect of this.effects()) {
      effect.calculate();
    }
  }

  // Rename this method to match Process child classes
  public *effects(): IterableIterator<Calculable> {
    for (const propertyName of Object.getOwnPropertyNames(this)) {
      const child = (this as any)[propertyName];

      if (child instanceof Mutation || child instanceof Effect) {
        yield child;
      }
    }
  }
}
