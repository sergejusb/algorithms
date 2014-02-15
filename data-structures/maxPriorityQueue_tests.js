var BinaryHeap = require('./binaryHeap.js');
var MaxPriorityQueue = require('./maxPriorityQueue.js');

var MaxPriorityQueueTestRunner = (function () {
    function MaxPriorityQueueTestRunner() {
    }

    MaxPriorityQueueTestRunner.prototype.runTests = function() {
        var assert = require("assert");
        
        describe("Priority queue (max)", function() {
            var maxPriorityQueue = null;

            beforeEach(function() {
                maxPriorityQueue = new MaxPriorityQueue();
            });


            describe("insert()", function() {
                it("is 'a' when 'a' inserted with priority 0 into empty priority queue", function() {
                    maxPriorityQueue.insert('a', 0);
                    
                    assert.equal('a', maxPriorityQueue.findMax());
                });

                it("is 'b' when 'a' inserted with priority 0 and 'b' inserted with priority 1", function() {
                    maxPriorityQueue.insert('a', 0);
                    maxPriorityQueue.insert('b', 1);
                    
                    assert.equal('b', maxPriorityQueue.findMax());
                });
            });

            describe("deleteMax()", function() {
                it("throws when empty", function() {
                    assert.throws(function() {
                        maxPriorityQueue.deleteMax();
                    });
                });

                it("returns 'a' when 'a' inserted with priority 0 into empty priority queue", function() {
                    maxPriorityQueue.insert('a', 0);
                    
                    assert.equal('a', maxPriorityQueue.deleteMax());
                });

                it("returns 'b' when 'a' inserted with priority 0 and 'b' inserted with priority 1", function() {
                    maxPriorityQueue.insert('a', 0);
                    maxPriorityQueue.insert('b', 1);
                    
                    assert.equal('b', maxPriorityQueue.deleteMax());
                });

                it("returns 'b' when 'a' and 'c' inserted with priority 0 and 'b' inserted with priority 1", function() {
                    maxPriorityQueue.insert('a', 0);
                    maxPriorityQueue.insert('b', 1);
                    maxPriorityQueue.insert('c', 0);
                    
                    assert.equal('b', maxPriorityQueue.deleteMax());
                });

                it("returns 'a', 'b' and 'c' when inserted with priority 2, 1 and 0 respectively", function() {
                    maxPriorityQueue.insert('a', 2);
                    maxPriorityQueue.insert('b', 1);
                    maxPriorityQueue.insert('c', 0);
                    
                    assert.equal('a', maxPriorityQueue.deleteMax());
                    assert.equal('b', maxPriorityQueue.deleteMax());
                    assert.equal('c', maxPriorityQueue.deleteMax());
                });
            });

            describe("findMax()", function() {
                it("throws when empty", function() {
                    assert.throws(function() {
                        maxPriorityQueue.findMax();
                    });
                });

                it("returns 'a' when 'a' inserted with priority 0 into empty priority queue", function() {
                    maxPriorityQueue.insert('a', 0);
                    
                    assert.equal('a', maxPriorityQueue.findMax());
                });

                it("returns, but not removes item from priority queue", function() {
                    maxPriorityQueue.insert('a', 0);
                    maxPriorityQueue.findMax();

                    assert.equal(1, maxPriorityQueue.length());
                });
            });

            describe("length()", function() {
                it("is 0 for newly created priority queue", function() {
                    assert.equal(0, maxPriorityQueue.length());
                });

                it("is 1 when single item inserted into empty priority queue", function() {
                    maxPriorityQueue.insert('a', 0);

                    assert.equal(1, maxPriorityQueue.length());
                });

                it("is 0 when single item inserted into empty priority queue and then removed", function() {
                    maxPriorityQueue.insert('a', 0);
                    maxPriorityQueue.deleteMax();

                    assert.equal(0, maxPriorityQueue.length());
                });
            });
        });
    };

    return MaxPriorityQueueTestRunner;
})();

var testRunner = new MaxPriorityQueueTestRunner();
testRunner.runTests();