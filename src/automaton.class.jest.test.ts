import { Action } from './action.class';
import { State } from './state.class';
import { Automaton } from './automaton.class';
import { InvalidArgumentException } from './exceptions';

class Action1 extends Action {}
class State1 extends State {}
class State2 extends State {}
class Automaton1 extends Automaton {}

describe('Automaton', () => {
    it('constructor_empty-automata_empty-states', () => {
        const automaton = new Automaton();
        expect(automaton.getStates().length).toBe(0);
    });
    it('constructor_empty-automata_empty-ends', () => {
        const automaton = new Automaton();
        expect(automaton.getEnd().length).toBe(0);
    });
    it('constructor_empty-automata_undefined-begin-state', () => {
        const automaton = new Automaton();
        expect(automaton.getBegin()).toBeUndefined();
    });
    it('constructor_empty-automata_undefined-current-state', () => {
        const automaton = new Automaton();
        expect(automaton.getCurrentState()).toBeUndefined();
    });
    it('constructor_empty-automata_isfinished-false', () => {
        const automaton = new Automaton();
        expect(automaton.isFinished()).toBe(false);
    });
    it('getName_return-class-name', () => {
        const automaton = new Automaton();
        expect(automaton.getName()).toBe('Automaton');
        const automaton1 = new Automaton1();
        expect(automaton1.getName()).toBe('Automaton1');
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
        const s = new State();
        automaton.addState(s);
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
        expect(automaton.getEnd()).toContain(states);
    });
    
    
});