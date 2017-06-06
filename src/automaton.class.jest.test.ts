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
});