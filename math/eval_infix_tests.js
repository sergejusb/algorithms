var eval_infix = require('./eval_infix.js');

var InfixTestRunner = (function() {
    function InfixTestRunner() {
    }

    InfixTestRunner.prototype.runTests = function(evalFunction) {
        var assert = require("assert");

        describe(evalFunction.name + "()", function() {
            it("can evaluate infix expression", function() {
                var expr = "((15 / (7 - (1 + 1))) * 3) - (2 + (1 + -1))";
                assert.equal(7, evalFunction(expr));
            });
        });
    }

    return InfixTestRunner;
})();

var testRunner = new InfixTestRunner();
testRunner.runTests(eval_infix);