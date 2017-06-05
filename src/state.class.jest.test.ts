import { State } from './state.class';
import { Action } from './action.class';
import { UnsupportedOperationException } from './exceptions';

class State1 extends State {}
class Action1 extends Action {}

describe('State', () => {
    it('toString', () => {
        const s = new State();
        expect(s.toString()).toBe('State[class=State]');
        const s1 = new State1();
        expect(s1.toString()).toBe('State1[class=State1]');
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
    it('getAction_with-not-valid-string_thowUnsupportedOperationException', () => {
        const s = new State();
        const providers = [undefined, null];
        providers.forEach((actionName) => {
            expect(() =>{ s.getAction(actionName); }).toThrow(Error);
            //expect(() =>{ s.getAction(actionName); }).toThrow(UnsupportedOperationException);
            expect(() =>{ s.getAction(actionName); })
                .toThrow('Invalid action '+actionName+' in state State[class=State]');
        });
        
    });
    it('getAction_state-has-no-actions_thowUnsupportedOperationException', () => {
        const state = new State();
        const actionName = 'any';
        expect(() =>{ state.getAction(actionName); }).toThrow(Error);
        //expect(() =>{ state.getAction(actionName); }).toThrow(UnsupportedOperationException);
        expect(() =>{ state.getAction(actionName); }).toThrow('Invalid action '+actionName+' in state State[class=State]');
    });
    it('getAction_state-has-one-actions--get-not-found-action_thowUnsupportedOperationException', () => {
        const state = new State();
        const a = new Action(state);
        state.addAction(a);
        const actionName = 'Action1';
        expect(() =>{ state.getAction(actionName); }).toThrow(Error);
        //expect(() =>{ state.getAction(actionName); }).toThrow(UnsupportedOperationException);
        expect(() =>{ state.getAction(actionName); }).toThrow('Invalid action '+actionName+' in state State[class=State]');
    });
    it('getAction_state-with-two-action--get-all-action-by-name_return-correct-actions', () => {
        const s = new State();
        const a = new Action(s);
        const a1 = new Action1(s);
        s.addAction(a); s.addAction(a1);
        expect(s.getAction(a.getName())).toBe(a);
        expect(s.getAction(a1.getName())).toBe(a1);
    });
});