const {
    isRealString
} = require('./validation');

var expect = require('expect');

describe('Validation tests', () => {

    it('should reject non-string values', () => {
        var val = isRealString(111);
        expect(val).toEqual(false);
    });

    it('should reject string with only spaces', () => {
        var val = isRealString('   ');
        expect(val).toEqual(false);
    });

    it('should allow string with non-space characters', () => {
        var val = isRealString('    ziomek   ');
        expect(val).toEqual(true);
    });


});