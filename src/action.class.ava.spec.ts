import { test } from 'ava';
import { Action } from './action.class';

test('Action_constructor_nullOriginState_throwError', t => {
    const provider = [ null, undefined ];
    provider.forEach(v => {
        const error = t.throws(() => {
            new Action(v);
        }, Error);
        t.is(error.message, 'Action() -> '+v+' must have originState set');
    });
});
test('Action_constructor_nullOrEmptyTargetStateArgument_targetStateEqualOriginState', t => {
   t.fail(); 
});