import { Action } from './action.class';
import { State } from './state.class';
import { Automaton } from './automaton.class';
import { InvalidArgumentException } from './exceptions';

class Action1 extends Action {}
class State1 extends State {}
class State2 extends State {}
class Automaton1 extends Automaton {}

let createAutomatonWithOneStateThatHaveOneAction = () => {
    const state = new State();
    const action = new Action(state);
    state.addAction(action);
    const automaton = new Automaton();
    automaton.addState(state);
    automaton.setBegin(state);
    automaton.addEnd(state);
    return automaton;
};

describe('Automaton', () => {
    it('constructor_empty-automata_empty-states', () => {
        expect(new Automaton().getStates().length).toBe(0);
    });
    it('constructor_empty-automata_empty-ends', () => {
        expect(new Automaton().getEnd().length).toBe(0);
    });
    it('constructor_empty-automata_undefined-begin-state', () => {
        expect(new Automaton().getBegin()).toBeUndefined();
    });
    it('constructor_empty-automata_undefined-current-state', () => {
        expect(new Automaton().getCurrentState()).toBeUndefined();
    });
    it('constructor_empty-automata_isfinished-false', () => {
        expect(new Automaton().isFinished()).toBe(false);
    });
    it('getName_return-class-name', () => {
        expect(new Automaton().getName()).toBe('Automaton');
        expect(new Automaton1().getName()).toBe('Automaton1');
    });
    it('addState_null-or-undefined-param_throwError', () => {
        const automaton = new Automaton();
        const providers = [null, undefined];
        providers.forEach((v) => {
            expect(() => { automaton.addState(v)}).toThrow();
            expect(automaton.getStates().length).toBe(0);
        });
    });
    it('addState_empty-automaton_count-one-automata-state', () => {
        const automaton = new Automaton();
        automaton.addState(new State());
        expect(automaton.getStates().length).toBe(1);
    });
    it('addState_add-same-state-multiple-time_count-one-automata-state', () => {
        const automaton = new Automaton();
        const s = new State();
        for (let i = 0; i < 7; i++){
            automaton.addState(s);
            expect(automaton.getStates().length).toBe(1);
        }
        expect(automaton.getStates().length).toBe(1);
    });
    it('addState_add-three-different-state-class_count-three-automata-state', () => {
        const automaton = new Automaton();
        const s = new State();
        const s1 = new State1();
        const s2 = new State2();
        for (let i = 0; i < 7; i++){
            automaton.addState(s);
            expect(automaton.getStates().length).toBe(1);
        }
        for (let i = 0; i < 7; i++){
            automaton.addState(s1);
            expect(automaton.getStates().length).toBe(2);
        }
        for (let i = 0; i < 7; i++){
            automaton.addState(s2);
            expect(automaton.getStates().length).toBe(3);
        }
        expect(automaton.getStates().length).toBe(3);
    });
    it('getState_null-or-undefined-parameter_throwError', () => {
        const automaton = new Automaton();
        const provider = [null, undefined];
        provider.forEach((v) => {
            expect(() => { automaton.getState(v) }).toThrow(Error);
            //expect(() => { automaton.getState(v) }).toThrow(InvalidArgumentException);
            expect(() => { automaton.getState(v) }).toThrow('invalid argument, name must be passed');
        });
    });
    it('getState_state-name-not-added_return-undefined', () => {
        const automaton = new Automaton();
        const s1 = new State1();
        automaton.addState(s1);
        const provider = ['',(new State().getName()), 'zio-pino'];
        provider.forEach((v) => {
            expect(automaton.getState(v)).toBeUndefined();
        });
    });
    it('getState_three-state-added_return-correctly', () => {
        const automaton = new Automaton();
        const s1 = new State1();
        const s2 = new State2();
        const s = new State();
        automaton.addState(s1);
        automaton.addState(s2);
        automaton.addState(s);
        expect(automaton.getState(s.getName())).toBe(s);
        expect(automaton.getState(s2.getName())).toBe(s2);
        expect(automaton.getState(s1.getName())).toBe(s1);
    });
    
    it('setBegin_null-or-undefined-param_throwError', () => {
        const automaton = new Automaton();
        const provider = [null, undefined];
        provider.forEach((v) => {
            expect(() => { automaton.setBegin(v) }).toThrow(Error);
            //expect(() => { automaton.setBegin(v) }).toThrow(InvalidArgumentException);
            expect(() => { automaton.setBegin(v) }).toThrow('invalid argument, begin must be passed');
        });
    });
    it('setBegin_set-begin-state-before-add-state-to-states_throwError', () => {
        const automaton = new Automaton();
        const s = new State();
        expect(() => {automaton.setBegin(s)}).toThrow(Error);
        expect(() => {automaton.setBegin(s)}).toThrow('begin state not declared in the automaton');
    });
    it('setBegin_use-state-param_getBegin-return-correct-state', () => {
        const automaton = new Automaton();
        const s = new State();
        automaton.addState(s);
        automaton.setBegin(s);
        expect(automaton.getBegin()).toBe(s);
    });
    
    it('setBegin_execute-multiple-time-setBegin_throwError', () => {
        const automaton = new Automaton();
        const s = new State();
        const s1 = new State1();
        automaton.addState(s);
        automaton.setBegin(s);
        expect(automaton.getBegin()).toBe(s);
        [s, s1].forEach((v) => {
            expect(() => {automaton.setBegin(v)}).toThrow(Error);
            expect(() => {automaton.setBegin(v)}).toThrow('begin state already defined');
        });
    });
    it('addEnd_null-or-undefined-param_throwError', () => {
        const automaton = new Automaton();
        const provider = [null, undefined];
        provider.forEach((v) => {
            expect(() => { automaton.addEnd(v) }).toThrow(Error);
            //expect(() => { automaton.addEnd(v) }).toThrow(InvalidArgumentException);
            expect(() => { automaton.addEnd(v) }).toThrow('invalid argument, end must be passed');
        });
    });
    it('addEnd_set-begin-state-before-add-state-to-states_throwError', () => {
        const automaton = new Automaton();
        const s = new State();
        expect(() => {automaton.addEnd(s)}).toThrow(Error);
        expect(() => {automaton.addEnd(s)}).toThrow('end state not declared in the automaton');
    });
    it('addEnd_add-one-state-to-end_return-correct-one-state', () => {
        const automaton = new Automaton();
        const s = new State();
        const s1 = new State1();
        automaton.addState(s);
        automaton.addEnd(s);
        expect(automaton.getEnd().length).toBe(1);
        expect(automaton.getEnd()[0]).toBe(s);
    });
    it('addEnd_add-multiple-time-same-state_throwError', () => {
        const automaton = new Automaton();
        const s = new State();
        automaton.addState(s);
        automaton.addEnd(s);
        for (let i = 0; i < 7; i++){
            expect(() => {automaton.addEnd(s)}).toThrow(Error);
            expect(() => {automaton.addEnd(s)}).toThrow('end state already added');
        }
    });
    it('addEnd_add-multiple-different-state_return-all-added-states', () => {
        const automaton = new Automaton();
        const states = [new State(), new State1(), new State2()];
        states.forEach((v) => {
            automaton.addState(v);
            automaton.addEnd(v);
        });
        const returnedEndStates = automaton.getEnd();
        expect(returnedEndStates.length).toBe(states.length);
        states.forEach((v) => {
            expect(returnedEndStates).toContain(v);
        });
    });
    it.skip('addEnd _ sobstitute state after added that state into end states _ what happen to end state, manage this condition into checkIntegrity tests', () => {
        const automaton = new Automaton();
        const states = [new State(), new State1(), new State2(), new State()];
        states.forEach((v) => {
            automaton.addState(v);
            automaton.addEnd(v);
        });
        automaton.setBegin(states[3]);
        const returnedEndStates = automaton.getEnd();
        console.log('ends',returnedEndStates, 'states',automaton.getStates());
        expect(returnedEndStates.length).toBe(states.length);
        states.forEach((v) => {
            expect(returnedEndStates).toContain(v);
        });
        automaton.checkIntegrity();
        //fail();
    });
    it('setCurrentState_no-end-states-added_throwError', () => {
        const automaton = new Automaton();
        const s = new State();
        expect(() => { automaton.setCurrentState(s) }).toThrow(Error);
        expect(() => { automaton.setCurrentState(s) }).toThrow('icomplete automaton: end state(s) not defined');
    });
    it('setCurrentState_setted-begin-and-added-ends-null-or-undefined-param_throwError', () => {
        const automaton = new Automaton();
        const s = new State();
        automaton.addState(s);
        automaton.addEnd(s);
        automaton.setBegin(s);
        const provider = [null, undefined];
        provider.forEach((v) => {
            expect(() => { automaton.setCurrentState(v) }).toThrow(Error);
            //expect(() => { automaton.setCurrentState(v) }).toThrow(InvalidArgumentException);
            expect(() => { automaton.setCurrentState(v) }).toThrow('automaton state cannot be null or undefined');
        });
    });
    it('setCurrentState_set-current-state-with-not-defined-state-in-the-automaton_throwError', () => {
        const automaton = new Automaton();
        const s = new State();
        const s1 = new State1();
        automaton.addState(s);
        automaton.addEnd(s);
        automaton.setBegin(s);
        expect(() => { automaton.setCurrentState(s1); }).toThrow(Error);
        expect(() => { automaton.setCurrentState(s1); }).toThrow('incomplete automaton: state is not defined in the automaton');
    });
    it('setCurrentState_added-state-setted-begin-added-ends_return-getCurrentState-correctly', () => {
        const automaton = new Automaton();
        const s = new State();
        const s1 = new State1();
        automaton.addState(s);
        automaton.addState(s1);
        automaton.addEnd(s);
        automaton.setBegin(s);
        automaton.setCurrentState(s1);
        expect(automaton.getCurrentState()).toBe(s1);
    });
    it('setCurrentStateByName_null-or-undefined-param_throwError', () => {
        const automaton = new Automaton();
        const provider = [null, undefined];
        provider.forEach((v) => {
            expect(() => { automaton.setCurrentStateByName(v) }).toThrow(Error);
            //expect(() => { automaton.setCurrentStateByName(v) }).toThrow(InvalidArgumentException);
            expect(() => { automaton.setCurrentStateByName(v) }).toThrow('invalid argument, stateName must be passed');
        });
    });
    it('setCurrentState_added-state-setted-begin-added-ends_return-getCurrentState-correctly', () => {
        const automaton = new Automaton();
        const s = new State();
        const s1 = new State1();
        automaton.addState(s);
        automaton.addState(s1);
        automaton.addEnd(s);
        automaton.setBegin(s);
        automaton.setCurrentStateByName(s1.getName())
        expect(automaton.getCurrentState()).toBe(s1);
    });
    
    it('doAction_null-or-undefined-param_throwError', () => {
        const automaton = createAutomatonWithOneStateThatHaveOneAction();
        const provider = [null, undefined];
        provider.forEach((v) => {
            expect(() => { automaton.doAction(v) }).toThrow(Error);
            //expect(() => { automaton.doAction(v) }).toThrow(InvalidArgumentException);
            expect(() => { automaton.doAction(v) }).toThrow('invalid argument, actionName must be passed');
        });
    });
   
   it('doAction_no-current-state-setted_throwError', () => {
       const automaton = createAutomatonWithOneStateThatHaveOneAction();
       const action = automaton.getState('State').getAction('Action');
       expect( () => { automaton.doAction(action.getName()); }).toThrow(Error);
       expect( () => { automaton.doAction(action.getName()); }).toThrow('current state not selected in the automaton');
   });
   it('doAction_not-supported-action_throwError', () => {
       const automaton = createAutomatonWithOneStateThatHaveOneAction();
       automaton.setCurrentState(automaton.getState('State'));
       const provider = ['zio', 'pino'];
       provider.forEach((v) => {
            expect( () => { automaton.doAction(v); }).toThrow(Error);
            expect( () => { automaton.doAction(v); }).toThrow('Invalid action '+v+' in state State[class=State]');
       });
   });
   it('doAction_without-param_return-null', () => {
       const automaton = createAutomatonWithOneStateThatHaveOneAction();
       automaton.setCurrentState(automaton.getState('State'));
       expect(automaton.doAction(automaton.getState('State').getAction('Action').getName())).toBeNull();
   });
   it('doAction_pass-param-into-method_action.execute-will-have-same-param-value', () => {
       const automaton = createAutomatonWithOneStateThatHaveOneAction();
       const s = automaton.getState('State');
       const a1 = new Action1(s, s);
       s.addAction(a1);
       const spy = jest.spyOn(a1, 'execute');
       automaton.setCurrentState(automaton.getState('State'));
       const provider = ['ziopino', 1, {'hello': 1, 'world': 2}, null, [], undefined];
       provider.forEach((v, i) => {
            const r = automaton.doAction(a1.getName(), v);
            expect(spy.mock.calls.length).toBe(i+1);
            expect(spy.mock.calls[i]).toEqual([provider[i]]);
            expect(r).toBeNull();
       });
       spy.mockReset();
       spy.mockRestore();
   });
   
   it('move_null-or-undefined-param_throwError', () => {
        const automaton = createAutomatonWithOneStateThatHaveOneAction();
        const provider = [null, undefined];
        provider.forEach((v) => {
            expect(() => { automaton.move(v) }).toThrow(Error);
            //expect(() => { automaton.move(v) }).toThrow(InvalidArgumentException);
            expect(() => { automaton.move(v) }).toThrow('invalid argument, actionName must be passed');
        });
    });
   
   it('move_currentState-not-setted_throwError', () => {
        const automaton = createAutomatonWithOneStateThatHaveOneAction();
        const actionName = automaton.getState('State').getAction('Action').getName();
        expect(() => { automaton.move(actionName) }).toThrow(Error);
        expect(() => { automaton.move(actionName) }).toThrow('current state not selected in the automaton');
   });
   
   
   it('move_unsupported-action-param_throwError', () => {
        const automaton = createAutomatonWithOneStateThatHaveOneAction();
        automaton.setCurrentStateByName('State');
        const actionName = 'ziopino';
        expect(() => { automaton.move(actionName) }).toThrow(Error);
        expect(() => { automaton.move(actionName) }).toThrow('Invalid action ziopino in state State[class=State]');
   });
   
   it('move_use-supported-action-param_move-to-next-state', () => {
       const automaton = createAutomatonWithOneStateThatHaveOneAction();
       const s1 = new State1();
       let s = automaton.getState('State');
       const a1 = new Action1(s, s1);
       s.addAction(a1);
       automaton.addState(s1);
       automaton.setCurrentStateByName('State');
       automaton.move(a1.getName());
       expect(automaton.getCurrentState()).toBe(s1);
   });
   it('toString_no-nextActions-in-states_return-string', () => {
       const automaton = new Automaton();
       expect(automaton.toString()).toBe('Automaton: state->actions mapping {  }');
       const s = new State();
       automaton.addState(s);
       expect(automaton.toString()).toBe('Automaton: state->actions mapping {  }');
   });
   it('toString_one-action-and-one-state_return-string', () => {
       const automaton = new Automaton();
       const s = new State();
       const a = new Action(s, s);
       s.addAction(a);
       automaton.addState(s);
       expect(automaton.toString())
       .toBe('Automaton: state->actions mapping { State[class=State].Action() -> State[class=State] }');
   });
   it('toString_multi-action-and-multi-states_return-string', () => {
        const automaton = new Automaton();
        const s = new State();
        const s1 = new State1();        

        s.addAction(new Action(s, s1));
        s.addAction(new Action1(s, s));

        s1.addAction(new Action1(s1, s));
        s1.addAction(new Action(s1, s1));
        
        automaton.addState(s);
        automaton.addState(s1);
        expect(automaton.toString())
        .toBe('Automaton: state->actions mapping { State[class=State].Action() -> State1[class=State1],State[class=State].Action1() -> State[class=State];State1[class=State1].Action1() -> State[class=State],State1[class=State1].Action() -> State1[class=State1] }');
   });
   it('checkIntegrity_correct-settings-return-void', () => {
       const s = new State();
       const a = new Action(s, s);
       s.addAction(a);
       const automaton = new Automaton();
       automaton.addState(s);
       automaton.addEnd(s);
       automaton.setBegin(s);
       automaton.checkIntegrity();
   });
   
   it('checkIntegrity_no-begin-state-setted_throwError', () => {
       const automaton = new Automaton();
       expect(() => {automaton.checkIntegrity()}).toThrow(Error);
       expect(() => {automaton.checkIntegrity()}).toThrow('automaton has not initial state');
   });
   it('checkIntegrity_begin-state-no-next-actions-and-endstates-contain-begin_throwError', () => {
       const automaton = new Automaton();
       const s = new State();
       automaton.addState(s);
       automaton.setBegin(s);
       automaton.addEnd(s);
       expect(() => {automaton.checkIntegrity()}).toThrow(Error);
       expect(() => {automaton.checkIntegrity()}).toThrow('initial state State[class=State] is a dead-end (has no outgoing action)');
   });
});