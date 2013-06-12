var Queue = require('./queue.js');

var QueueTesterRunner = (function () {
    function QueueTesterRunner() {
    }

    QueueTesterRunner.prototype.runTests = function(name, queueFactory) {
        var assert = require("assert");

        describe(name, function() {
            var queue = null;

            beforeEach(function() {
                queue = queueFactory();
            });

            describe("enqueue()", function() {
                it("can enqueue item to empty list", function() {
                    queue.enqueue(1);
                    assert.equal(1, queue.list.head.next.item);
                })

                it("can enqueue fifo", function() {
                    queue.enqueue(1);
                    queue.enqueue(2);
                    assert.equal(1, queue.list.head.next.item);
                    assert.equal(2, queue.list.head.next.next.item);
                });
            });

            describe("dequeue()", function() {
                it("can dequeue item from non-empty list", function() {
                    queue.enqueue(1);
                    assert.equal(1, queue.dequeue());
                })

                it("can dequeue fifo", function() {
                    queue.enqueue(1);
                    queue.enqueue(2);
                    assert.equal(1, queue.dequeue());
                    assert.equal(2, queue.dequeue());
                });

                it("throws when empty", function() {
                    assert.throws(function() {
                        queue.dequeue();
                    });
                });
            });

            describe("peek()", function() {
                it("is nulll when empty", function() {
                    assert.equal(null, queue.peek());
                });

                it("is 1 when <1>", function() {
                    queue.enqueue(1);
                    assert.equal(1, queue.peek());
                });

                it("is 3 when <1,2,3>", function() {
                    queue.enqueue(1);
                    queue.enqueue(2);
                    queue.enqueue(3);
                    assert.equal(1, queue.peek());
                });
            });

            describe("isEmpty()", function() {
                it("is true when empty", function() {
                    assert.equal(true, queue.isEmpty());
                });

                it("is false when at least 1 item", function() {
                    queue.enqueue(1);
                    assert.equal(false, queue.isEmpty());
                });
            });

            describe("length()", function() {
                it("is 0 for newly created queue", function() {
                    assert.equal(0, queue.length());
                });

                it("is 3 when contains 3 items", function() {
                    queue.enqueue(1);
                    queue.enqueue(2);
                    queue.enqueue(3);
                    assert.equal(3, queue.length());
                });
            });
        });
    }

    return QueueTesterRunner;
})();

var testRunner = new QueueTesterRunner();
testRunner.runTests("Queue (linked list)", function() { return new Queue(); });