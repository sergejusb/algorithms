var Node = (function () {
    function Node(item, node) {
        this.item = item;
        this.next = node;
    }
    
    return Node;
})();

var Stack = (function () {
    function Stack() {
        this.head = null;
    }

    Stack.prototype.push = function(item) {
        this.head = new Node(item, this.head);
    }

    Stack.prototype.pop = function() {
        var node = this.head;
        if (node == null) {
            throw new Error("stack is empty");
        }

        this.head = this.head.next;
        return node.item; 
    }

    Stack.prototype.isEmpty = function() {
        return this.head === null;
    }

    Stack.prototype.length = function() {
        var length = 0;
        var current = this.head;

        while(current != null) {
            length++;
            current = current.next;
        }

        return length;
    }

    return Stack;
})();

var FixedArrayStack

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
                    assert.equal(1, stack.head.item);
                })

                it("can push fifo", function() {
                    stack.push(1);
                    stack.push(2);
                    assert.equal(2, stack.head.item);
                    assert.equal(1, stack.head.next.item);
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

                it("is 1 when contains 1 item", function() {
                    stack.push(1);
                    assert.equal(1, stack.length());
                });

                it("is 3 when contains 3 items", function() {
                    stack.push(1);
                    stack.push(2);
                    stack.push(3);
                    assert.equal(3, stack.length());
                });

                it("can call multiple times", function() {
                    stack.push(1);
                    stack.length();
                    assert.equal(1, stack.length());
                });
            });
        });
    }

    return StackTesterRunner;
})();

var testRunner = new StackTesterRunner();
testRunner.runTests("Stack (linked list)", function() { return new Stack(); });