var Stack = (function () {
    function Stack() {
        var linkedList = require('./linkedList.js'); 
        this.list = new linkedList.SinglyLinkedList();
    }

    Stack.prototype.push = function(item) {
        this.list.add(item, 0);
    }

    Stack.prototype.pop = function() {
        if (this.list.isEmpty()) {
            throw new Error("can not pop when stack is empty, check isEmpty() before pop()");
        }

        return this.list.remove(0);
    }

    Stack.prototype.isEmpty = function() {
        return this.list.isEmpty();
    }

    Stack.prototype.length = function() {
        return this.list.length();
    }

    return Stack;
})();

module.exports.Stack = Stack;


var StackTesterRunner = (function () {
    function StackTesterRunner() {
    }

    StackTesterRunner.prototype.runTests = function(name, stackFactory) {
        var assert = require("assert");

        describe(name, function() {
            var stack = null;

            beforeEach(function() {
                stack = stackFactory();
            });

            describe("push()", function() {
                it("can push item to empty list", function() {
                    stack.push(1);
                    assert.equal(1, stack.list.head.next.item);
                })

                it("can push fifo", function() {
                    stack.push(1);
                    stack.push(2);
                    assert.equal(2, stack.list.head.next.item);
                    assert.equal(1, stack.list.head.next.next.item);
                });
            });

            describe("pop()", function() {
                it("can pop item from non-empty list", function() {
                    stack.push(1);
                    assert.equal(1, stack.pop());
                })

                it("can pop fifo", function() {
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

                it("is 3 when contains 3 items", function() {
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