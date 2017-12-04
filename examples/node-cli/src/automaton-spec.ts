/// <reference types="../../../dist/commonjs" />
import { Action, State, Automaton } from '../../../dist/commonjs';

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

export default automaton;