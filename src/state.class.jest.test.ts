import { State } from './state.class';
import { Action } from './action.class';

class State1 extends State {}

describe('State', () => {
    it('toString', () => {
        const state = new State();
        expect(state.toString()).toBe('State[class=State]');
    });
    it('getName', () => {
        const state = new State();
        expect(state.getName()).toBe('State');
    });
    it('constructor_empty_next_actions', () => {
        const state = new State();
        expect(state.getNextInputs().length).toBe(0);
    });
    it('constructor_empty_next_inputs', () => {
        const state = new State();
        expect(state.getNextInputs().length).toBe(0);
    });
    it('addAction_action-have-another-origin-state_throwError', () => {
        const state = new State();
        const state1 = new State1();
        const action = new Action(state1);
        expect(() =>{ state.addAction(action); }).toThrow(Error);
        expect(() =>{ state.addAction(action); }).toThrow("L'origine della azione deve essere questo stato");
    });
});