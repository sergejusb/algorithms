var Stack = require('./stack.js');
var IntStack = require('./stack_array.js');

var StackTesterRunner = (function () {
    function StackTesterRunner() {
    }

    StackTesterRunner.prototype.runTests = function(name, factory) {
        var assert = require("assert");

        describe(name, function() {
            var stack = null;

            beforeEach(function() {
                stack = factory();
            });

            describe("push()", function() {
                it("can push item to empty stack", function() {
                    stack.push(1);
                    assert.equal(1, stack.pop());
                })

                it("can push lifo", function() {
                    stack.push(1);
                    stack.push(2);
                    assert.equal(2, stack.pop());
                    assert.equal(1, stack.pop());
                });
            });

            describe("pop()", function() {
                it("can pop item from non-empty stack", function() {
                    stack.push(1);
                    assert.equal(1, stack.pop());
                })

                it("can pop lifo", function() {
                    stack.push(1);
                    stack.push(2);
                    assert.equal(2, stack.pop());
                    assert.equal(1, stack.pop());
                });

                it("throws when empty", function() {
                    assert.throws(function() {
                        stack.pop();
                    });
                });
            });

            describe("peek()", function() {
                it("is nulll when empty", function() {
                    assert.equal(null, stack.peek());
                });

                it("is 1 when <1>", function() {
                    stack.push(1);
                    assert.equal(1, stack.peek());
                });

                it("is 3 when <3,2,1>", function() {
                    stack.push(1);
                    stack.push(2);
                    stack.push(3);
                    assert.equal(3, stack.peek());
                });
            });

            describe("isEmpty()", function() {
                it("is true when empty", function() {
                    assert.equal(true, stack.isEmpty());
                });

                it("is false when at least 1 item", function() {
                    stack.push(1);
                    assert.equal(false, stack.isEmpty());
                });
            });

            describe("length()", function() {
                it("is 0 for newly created stack", function() {
                    assert.equal(0, stack.length());
                });

                it("is 3 when <3,2,1>", function() {
                    stack.push(1);
                    stack.push(2);
                    stack.push(3);
                    assert.equal(3, stack.length());
                });
            });
        });
    }

    return StackTesterRunner;
})();

var testRunner = new StackTesterRunner();
testRunner.runTests("Stack (linked list)", function() { return new Stack(); });
testRunner.runTests("Stack (array)", function() { return new IntStack(); });