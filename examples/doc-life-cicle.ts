import { Action } from '../src/action.class';
import { ActionInterface } from '../src/action.interface';
import { State } from '../src/state.class';
import { StateInterface } from '../src/state.interface';
import { AutomatonInterface } from '../src/automaton.interface';
import { Automaton } from '../src/automaton.class';

// States
class Nuovo extends State{};
class Cancellato extends State{};
class Pubblicabile extends State{};
class Pubblicato extends State{};

class Elimina extends Action{};
class Modifica extends Action{};
class Pubblica extends Action{};

let nuovo = new Nuovo();
let cancellato = new Cancellato();
let pubblicabile = new Pubblicabile();
let pubblicato = new Pubblicato();

nuovo.addAction(new Elimina(nuovo, cancellato));
nuovo.addAction(new Modifica(nuovo, pubblicabile));

pubblicabile.addAction(new Elimina(pubblicabile, cancellato));
pubblicabile.addAction(new Pubblica(pubblicabile, pubblicato));
pubblicabile.addAction(new Modifica(pubblicabile, pubblicabile));

pubblicato.addAction(new Modifica(pubblicato, pubblicabile));

let automaton = new Automaton();
[nuovo, cancellato, pubblicabile, pubblicato].forEach((s) => {
    automaton.addState(s);
});
automaton.addEnd(cancellato);
automaton.setBegin(nuovo);

// controllo di integrità dell'automa
automaton.checkIntegrity();

const doThenMove = (a) => {
    automaton.doAction(a);
    automaton.move(a);
};
const curretAutomatonState = () => {
    console.log('Current: ', automaton.getCurrentState().toString());
};
automaton.setCurrentState(nuovo);
curretAutomatonState();
['Modifica', 'Pubblica', 'Modifica', 'Modifica', 'Elimina'].forEach((a) => {
    console.log('exec: ', a);
    doThenMove(a);
    curretAutomatonState();
});