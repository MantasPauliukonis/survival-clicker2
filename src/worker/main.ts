import { Relay } from '@/classes/relay';
import { State } from '@/classes/game/state';
import { get } from 'lodash';
import { Calculable } from '@/classes/game/base/effects';
import { log, enableLogging } from '@/utils/log';
import { interval, ReplaySubject } from 'rxjs';
import { applyReset } from '@/classes/game/base/stats/methods';
import Decimal from 'decimal.js';

const ctx: Worker = self as any;
const relay = new Relay(ctx);

const state = new State();

emitAll();

relay.on('action', ({ path }) => {
  log('Calculating action of path', path);
  const action = get(state, path) as Calculable;
  const multiplier = new Decimal(1);
  if (action.validate({ multiplier })) {
    action.calculate({ multiplier });
    emitAll();
  }
});

relay.on('enableLogging', () => {
  enableLogging();
});

relay.on('reset', () => {
  applyReset(state);
  emitAll();
  emitStore();
});

relay.on('load', serializedState => {
  applyReset(state);
  state.unserialize(serializedState);
  emitAll();
});

interval(30e3).subscribe(() => {
  emitStore();
});

interval(1000).subscribe(() => {
  state.processes.calculate();
  state.timers.calculate();
  emitAll();

  if (state.stats.character.health.value.isZero()) {
    applyReset(state);
  }
});

function emitAll() {
  relay.emit('state', state.serialize('emit'));
}

function emitStore() {
  const serializedState = state.serialize('store');
  relay.emit('save', serializedState);
}
