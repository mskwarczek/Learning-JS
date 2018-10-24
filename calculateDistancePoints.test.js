const assert = require('assert');
const calculateDistancePoints = require('./calculateDistancePoints');

describe('calculateDistancePoints', () => {

    describe('normal hill', () => {
        it('should work with distance higer than K-point on normal hill', () => {
            const actual = calculateDistancePoints(111.0, 'normal', 98);
    
            const expected = 86.0;
    
            assert.equal(actual, expected);
        });

        it('should work with distance lower than K-point on normal hill', () => {
            const actual = calculateDistancePoints(85.5, 'normal', 98);
    
            const expected =  35.0;
    
            assert.equal(actual, expected);
        });

        it('should work with distance equal to K-point on normal hill', () => {
            const actual = calculateDistancePoints(98, 'normal', 98);
    
            const expected =  60;
    
            assert.equal(actual, expected);
        });
    });

    describe('large hill', () => {
        it('should work with distance higer than K-point on large hill', () => {
            const actual = calculateDistancePoints(134.0, 'large', 120);
    
            const expected = 85.2;
    
            assert.equal(actual, expected);
        });

        it('should work with distance lower than K-point on large hill', () => {
            const actual = calculateDistancePoints(114.5, 'large', 120);
    
            const expected =  50.1;
    
            assert.equal(actual, expected);
        });

        it('should work with distance equal to K-point on large hill', () => {
            const actual = calculateDistancePoints(120, 'large', 120);
    
            const expected =  60;
    
            assert.equal(actual, expected);
        });
    });

    describe('mammoth hill', () => {
        it('should work with distance higer than K-point on mammoth hill', () => {
            const actual = calculateDistancePoints(227.5, 'mammoth', 200);
    
            const expected = 153.0;
    
            assert.equal(actual, expected);
        });

        it('should work with distance lower than K-point on mammoth hill', () => {
            const actual = calculateDistancePoints(179.5, 'mammoth', 200);
    
            const expected =  95.4;
    
            assert.equal(actual, expected);
        });

        it('should work with distance equal to K-point on mammoth hill', () => {
            const actual = calculateDistancePoints(200, 'mammoth', 200);
    
            const expected =  120;
    
            assert.equal(actual, expected);
        });
    });
});