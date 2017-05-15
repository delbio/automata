import { Action } from '../src/action.class';
import { ActionInterface } from '../src/action.interface';
import { State } from '../src/state.class';
import { StateInterface } from '../src/state.interface';

const s = new State();
const a = new Action(s, s);

s.addAction(a);

console.log(s.toString());
console.log(a.toString());

s.getAction('ciao');

s.addAction(a);
