function isPrimeNumber(number) {
    if (number < 1) throw new Error("number can not be negative or zero");
    if (number === 1) return false;

    var limit = number >> 1;
    for (var i = 2; i <= limit; i++)
    {
        if (number % i === 0) return false;
    }

    return true;
}

var assert = require("assert");
describe("isPrimeNumber", function() {
    it("1 is not primary", function() {
        assert.equal(false, isPrimeNumber(1));
    });
    it("2 is primary", function() {
        assert.equal(true, isPrimeNumber(2));
    });
    it("3 is primary", function() {
        assert.equal(true, isPrimeNumber(3));
    });
    it("19 is primary", function() {
        assert.equal(true, isPrimeNumber(19));
    });
    it("100 is not primary", function() {
        assert.equal(false, isPrimeNumber(100));
    });
    it("101 is primary", function() {
        assert.equal(true, isPrimeNumber(101));
    });
    it("121 is not primary", function() {
        assert.equal(false, isPrimeNumber(121));
    });
});