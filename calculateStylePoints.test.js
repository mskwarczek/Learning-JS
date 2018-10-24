const assert = require('assert');
const calculateStylePoints = require('./calculateStylePoints');

describe('calculateStylePoints', () => {
    it('should discard min an max values and sum other values', () => {
        const actual = calculateStylePoints([18.0, 18.0, 18.0, 17.5, 18.5]);
    
        const expected = 54.0;
    
        assert.equal(actual, expected);
    });

    it('should work for two or more identical max values', () => {
        const actual = calculateStylePoints([18.0, 18.5, 17.5, 18.5, 18.5]);
    
        const expected = 55.0;
    
        assert.equal(actual, expected);
    });

    it('should work for two or more identical min values', () => {
        const actual = calculateStylePoints([18.0, 18.5, 18.0, 19.0, 18.5]);
    
        const expected = 55.0;
    
        assert.equal(actual, expected);
    });

    it('should work for all votes having the same value', () => {
        const actual = calculateStylePoints([15.0, 15.0, 15.0, 15.0, 15.0]);
    
        const expected = 45.0;
    
        assert.equal(actual, expected);
    });
});