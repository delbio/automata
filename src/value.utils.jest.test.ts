import { isString, isNullOrUndefined } from './value.utils';

describe('isString', () => {
  it('withNoStringArgument_returnFalse', () => {
    let providers = [ undefined, null, 12 ];
    providers.forEach( v => { expect(isString(v)).toBe(false); });
  });
  it('withStringArgument_returnTrue', () => {
    let providers = [ 'ciao', new String('ciao'), '', "", {'key': 'value'}.toString() ];
    providers.forEach( v => { expect(isString(v)).toBe(true); });
  });
});

describe('isNullOrUndefined', () => {
    it('withNullArgument_returnTrue', () => {
        let providers = [ undefined, null ];
        providers.forEach( v => { expect(isNullOrUndefined(v)).toBe(true); });
    });
    it('withNotNullArgument_returnFalse', () => {
        let providers = [ new String("ziopino"), "", '', 'ciao', {key: 'value'}, 1 ];
        providers.forEach( v => { expect(isNullOrUndefined(v)).toBe(false); });
    });
});

