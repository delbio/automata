import { State } from './state.class';
import { Action } from './action.class';

class State1 extends State {}
class Action1 extends Action {}

describe('State', () => {
    it('toString', () => {
        const state = new State();
        expect(state.toString()).toBe('State[class=State]');
    });
    it('getName_return-class-name', () => {
        const state = new State();
        expect(state.getName()).toBe('State');
        const state1 = new State1();
        expect(state1.getName()).toBe('State1');
    });
    it('constructor_empty_nextActions', () => {
        const state = new State();
        expect(state.getNextInputs().length).toBe(0);
    });
    it('constructor_empty_nextInputs', () => {
        const state = new State();
        expect(state.getNextInputs().length).toBe(0);
    });
    it('addAction_action-have-same-origin-state_correct-add', () => {
        const state = new State();
        const action = new Action(state);
        state.addAction(action);
        const nextActions = state.getNextActions();
        expect(nextActions.length).toBe(1);
        expect(nextActions[0]).toBe(action);
    });
    it('addAction_action-have-another-origin-state_throwError', () => {
        const state = new State();
        const state1 = new State1();
        const action = new Action(state1);
        expect(() =>{ state.addAction(action); }).toThrow(Error);
        expect(() =>{ state.addAction(action); }).toThrow("L'origine della azione deve essere questo stato");
    });
    it('addAction_state-already-has-action-with-same-name_throwError', () => {
        const state = new State();
        const action = new Action(state);
        state.addAction(action);
        expect(() =>{ state.addAction(action); }).toThrow(Error);
        expect(() =>{ state.addAction(action); }).toThrow("cannot add action Action to State[class=State]: state already has an action with the same name");
    });
    it('addAction_add-different-action_correctly-added', () => {
        const state = new State();
        const a1 = new Action(state);
        const a2 = new Action1(state);
        state.addAction(a1);
        state.addAction(a2);
        expect(state.getNextInputs()).toEqual(['Action', 'Action1']);
        expect(state.getNextActions()).toEqual([a1, a2]);
    });
});