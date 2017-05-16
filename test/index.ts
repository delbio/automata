import { Action } from '../src/action.class';
import { ActionInterface } from '../src/action.interface';
import { State } from '../src/state.class';
import { StateInterface } from '../src/state.interface';
import { AutomatonInterface } from '../src/automaton.interface';
import { Automaton } from '../src/automaton.class';


// Crea Stati e azioni
const s = new State();
const a = new Action(s,s);

// associa azione a stato
s.addAction(a);

console.log(s.toString());
console.log(a.toString());

try{ s.getAction('ziopino'); } catch (e) {
    console.log('getAction: ', e);
}

try{ s.addAction(a); } catch (e) {
    console.log('addAction: ', e);
}

// crea automa, aggiungi stati e stato inizio e stati di fine
const automaton = new Automaton();
automaton.addState(s);
automaton.setBegin(s);
automaton.addEnd(s);

// stampa mappa degli stati con transizioni
automaton.printInfo();

// controllo di integrità dell'automa
automaton.checkIntegrity();


