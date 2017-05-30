import { Test } from 'ava/types/generated';
import test from 'ava';
import { isString, isNullOrUndefined } from './value.utils';

test('isString_withNoStringArgument_returnFalse ', t => {
    let providers = [ undefined, null, 12 ];
    providers.forEach( v => { t.false(isString(v)); });
});
test('isString_withStringArgument_returnTrue ', t => {
    let providers = [ 'ciao', new String('ciao'), '', "", {'key': 'value'}.toString() ];
    providers.forEach( v => { t.true(isString(v)); });
});
test('isNullOrUndefined_withNullArgument_returnTrue', t => {
    let providers = [ undefined, null ];
    providers.forEach( v => { t.true(isNullOrUndefined(v)); });
});
test('isNullOrUndefined_withNotNullArgument_returnFalse', t => {
    let providers = [ new String("ziopino"), "", '', 'ciao', {key: 'value'}, 1 ];
    providers.forEach( v => { t.false(isNullOrUndefined(v)); });
});