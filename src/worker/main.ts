import { Relay } from '@/classes/relay';
import { State } from '@/classes/game/state';
import { get } from 'lodash';
import { Calculable } from '@/classes/game/base/effects';
import { log, enableLogging } from '@/utils/log';
import { interval, ReplaySubject } from 'rxjs';
import { applyLimitTriggers, applyReset } from '@/classes/game/base/stats/methods';
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
  emitStore();
});

relay.on('load', serializedState => {
  state.unserialize(serializedState);
  emitAll();
});

interval(3e3).subscribe(() => {
  emitStore();
});

interval(1000).subscribe(() => {
  state.processes.calculate();
  applyLimitTriggers(state);
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
