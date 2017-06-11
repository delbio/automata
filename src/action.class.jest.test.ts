import { Action } from './action.class';
import { State } from './state.class';

class Action1 extends Action {}
class State1 extends State {}

describe('Action', () => {
    it('constructor_nullOriginState_throwError', () => {
        const provider = [ null, undefined ];
        provider.forEach(v => {
            expect( () => { new Action(v); } )
                .toThrow(Error);
            expect( () => { new Action(v); } )
                .toThrow('Action() -> '+v+' must have originState set');
            
        });
    });
    it('constructor_nullOrEmptyTargetStateArgument_targetStateEqualOriginState', () => {
        const s = new State();
        const provider = [new Action(s), new Action(s, undefined), new Action(s, null)];
        provider.forEach((a) => {
            expect(a.getOriginState()).toBe(s);
            expect(a.getTargetState()).toBe(s);
        });
    });
    it('toString', () => {
        const s = new State();
        const a = new Action(s);
        expect(a.toString()).toBe('Action() -> State[class=State]');
    });
    it('getName_return-class-name', () => {
        const a = new Action(new State());
        expect(a.getName()).toBe('Action');
        const a1 = new Action1(new State);
        expect(a1.getName()).toBe('Action1');
    });
    it('getTargetState', () => {
        const s = new State();
        const s1 = new State1();
        const a = new Action(s1, s);
        expect(a.getTargetState()).toBe(s);
    });
    it('getOriginState', () => {
        const s = new State();
        const s1 = new State1();
        const a = new Action(s1, s);
        expect(a.getOriginState()).toBe(s1);
    });
    it('execute_any_return-null', () => {
        const s = new State();
        const a = new Action(s);
        const provider = [null, undefined, [], {'zio': 'pino'}, 12, new State(), 'zio pino'];
        expect(a.execute()).toBeNull();
        provider.forEach((v) => {
            expect(a.execute(v)).toBeNull();
        });
    });
});
