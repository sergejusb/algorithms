var pow_naive = require('./pow_naive.js');
var pow = require('./pow.js');

var PowTestRunner = (function() {
    function PowTestRunner() {
    }

    PowTestRunner.prototype.runTests = function(powFunction) {
        var assert = require("assert");

        describe(powFunction.name + "()", function() {
            it("is 1 when 0^0", function() {
                assert.equal(1, powFunction(0, 0));
            });

            it("is 0 when 0^1", function() {
                assert.equal(0, powFunction(0, 1));
            });

            it("is 1 when 1^2", function() {
                assert.equal(1, powFunction(1, 2));
            });

            it("is 4 when 2^2", function() {
                assert.equal(4, powFunction(2, 2));
            });

            it("is 8 when 2^3", function() {
                assert.equal(8, powFunction(2, 3));
            });

            it("is 97.65625 when 2.5^5", function() {
                assert.equal(97.65625, powFunction(2.5, 5));
            });

            it("is 0.04 when 5^-2", function() {
                assert.equal(0.04, powFunction(5, -2));
            });

            it("is 4 when -2^2", function() {
                assert.equal(4, powFunction(-2, 2));
            });

            it("is -8 when -2^3", function() {
                assert.equal(-8, powFunction(-2, 3));
            });

            it("is -97.65625 when -2.5^5", function() {
                assert.equal(-97.65625, powFunction(-2.5, 5));
            });
        });
    }

    return PowTestRunner;
})();

var testRunner = new PowTestRunner();
testRunner.runTests(pow_naive);
testRunner.runTests(pow);