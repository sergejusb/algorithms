var isPrimeNumber = require('./isPrimeNumber.js');
var assert = require("assert");

describe("isPrimeNumber()", function() {
    it("is not primary when 1", function() {
        assert.equal(false, isPrimeNumber(1));
    });

    it("is primary when 2", function() {
        assert.equal(true, isPrimeNumber(2));
    });
    
    it("is primary when 3", function() {
        assert.equal(true, isPrimeNumber(3));
    });
    
    it("is primary when 19", function() {
        assert.equal(true, isPrimeNumber(19));
    });
    
    it("is not primary when 100", function() {
        assert.equal(false, isPrimeNumber(100));
    });
    
    it("is primary when 101", function() {
        assert.equal(true, isPrimeNumber(101));
    });
    
    it("is not primary when 121", function() {
        assert.equal(false, isPrimeNumber(121));
    });
    
    it("throws when 0", function() {
        assert.throws(function() {
            isPrimeNumber(0);
        });
    });

    it("throws when -1", function() {
        assert.throws(function() {
            isPrimeNumber(-1);
        });
    });
});