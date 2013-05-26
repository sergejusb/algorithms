function pow_naive(number, exp) {
    if (number === 0 && exp < 0) throw new Error("negative exponent for zero");
    if (exp === 0) return 1;

    var positive = true;
    if (exp < 0)
    {
        positive = false;
        exp *= -1;
    }
    
    var result = 1;
    for (var i = 1; i <= exp; i++)
    {
        result *= number;
    }
    
    return positive ? result : 1 / result;
}

function pow(number, exp) {
    if (number === 0 && exp < 0) throw new Error("negative exponent for zero");
    if (exp === 0) return 1;

    var positive = true;
    if (exp < 0)
    {
        positive = false;
        exp *= -1;
    }

    var result = 1;
    while (exp >= 1)
    {
        if (exp % 2 != 0)
        {
            result *= number;
        }
        number *= number;
        exp >>= 1;
    }

    return positive ? result : 1 / result;
}

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
