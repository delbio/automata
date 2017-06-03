import { Action } from './action.class';

describe('Action', () => {
    it('constructor_nullOriginState_throwError', () => {
        const provider = [ null, undefined ];
        provider.forEach(v => {
            expect( () => { new Action(v); } )
                .toThrow('Action() -> '+v+' must have originState set');
        });
    });
    it('constructor_nullOrEmptyTargetStateArgument_targetStateEqualOriginState', () => {
    //t.fail(); 
    });
});


