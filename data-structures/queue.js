var Queue = (function () {
    function Queue() {
        var linkedList = require('./linkedList.js'); 
        this.list = new linkedList.SinglyLinkedList();
    }

    Queue.prototype.enqueue = function(item) {
        this.list.add(item, 0);
    }

    Queue.prototype.dequeue = function() {
        if (this.list.isEmpty()) {
            throw new Error("can not dequeue when queue is empty, check isEmpty() before dequeue()");
        }

        return this.list.removeFromEnd(0);
    }

    Queue.prototype.isEmpty = function() {
        return this.list.isEmpty();
    }

    Queue.prototype.length = function() {
        return this.list.length();
    }

    return Queue;
})();

module.exports.Queue = Queue;


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
                    assert.equal(2, queue.list.head.next.item);
                    assert.equal(1, queue.list.head.next.next.item);
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