const assert = require('assert');
const calculateTotalPoints = require('./calculateTotalPoints');

describe('calculateTotalPoints', () => {

    it('should work with positive points for wind and negative for gate', () => {
        const actual = calculateTotalPoints(111.0, 'large', 120, [17.0, 16.5, 16.5, 17.0, 16.5], 0.9, -6);
    
        const expected = 88.7;
    
        assert.equal(actual, expected);
    });

    it('should work with negative points for wind and positive for gate', () => {
        const actual = calculateTotalPoints(210.0, 'mammoth', 200, [17.5, 17.5, 17.0, 18.0, 17.5], -4.9, 8.7);
    
        const expected = 188.3;
    
        assert.equal(actual, expected);
    });
});