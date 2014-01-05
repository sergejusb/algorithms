var BinaryHeap = require('./binaryHeap.js');

var BinaryHeapTestRunner = (function () {
    function BinaryHeapTestRunner() {
    }

    BinaryHeapTestRunner.prototype.runTests = function() {
        var assert = require("assert");
        var assertMany = function(expected, actual) {
            for (var i = 0; i < actual.length; i++) {
                assert.equal(expected[i], actual[i]);
             }

            assert.equal(expected.length, actual.length);
        };

        describe("Binary heap (max)", function() {
            var binaryHeap = null;

            beforeEach(function() {
                binaryHeap = new BinaryHeap(function(a, b) { return a > b; });
            });

            describe("insert()", function() {
                it("is [0] when inserted into empty binary heap", function() {
                    binaryHeap.insert(0);
                    assertMany([0], binaryHeap.toArray());
                });

                it("is [1,0] when inserted 0 and then 1", function() {
                    binaryHeap.insert(0);
                    binaryHeap.insert(1);
                    assertMany([1,0], binaryHeap.toArray());
                });

                it("is [2,0,1] when inserted 0, 1 and then 2", function() {
                    binaryHeap.insert(0);
                    binaryHeap.insert(1);
                    binaryHeap.insert(2);
                    assertMany([2,0,1], binaryHeap.toArray());
                });
            });

            describe("delete()", function() {
                it("throws when empty", function() {
                    assert.throws(function() {
                        binaryHeap.delete();
                    });
                });

                it("returns 1 and then 0 when <1,0>", function() {
                    binaryHeap.insert(0);
                    binaryHeap.insert(1);

                    assert.equal(1, binaryHeap.delete());
                    assert.equal(0, binaryHeap.delete());
                });

                it("returns 2, 1 and then 0 when <2,0,1>", function() {
                    binaryHeap.insert(0);
                    binaryHeap.insert(1);
                    binaryHeap.insert(2);

                    assert.equal(2, binaryHeap.delete());
                    assert.equal(1, binaryHeap.delete());
                    assert.equal(0, binaryHeap.delete());
                });
            });

            describe("length()", function() {
                it("is 0 for newly created binary heap", function() {
                    assert.equal(0, binaryHeap.length());
                });

                it("is 1 when single item inserted into empty binary heap", function() {
                    binaryHeap.insert(0);
                    assert.equal(1, binaryHeap.length());
                });

                it("is 3 when 3 items inserted into empty binary heap", function() {
                    binaryHeap.insert(0);
                    binaryHeap.insert(1);
                    binaryHeap.insert(2);
                    assert.equal(3, binaryHeap.length());
                });
            });
        });

        describe("Binary heap (min)", function() {
            var binaryHeap = null;

            beforeEach(function() {
                binaryHeap = new BinaryHeap(function(a, b) { return a < b; });
            });

            describe("insert()", function() {
                it("is [0] when inserted into empty binary heap", function() {
                    binaryHeap.insert(0);
                    assertMany([0], binaryHeap.toArray());
                });

                it("is [0,1] when inserted 1 and then 0", function() {
                    binaryHeap.insert(1);
                    binaryHeap.insert(0);
                    assertMany([0,1], binaryHeap.toArray());
                });

                it("is [0,2,1] when inserted 2, 1 and then 0", function() {
                    binaryHeap.insert(2);
                    binaryHeap.insert(1);
                    binaryHeap.insert(0);
                    assertMany([0,2,1], binaryHeap.toArray());
                });
            });

            describe("delete()", function() {
                it("throws when empty", function() {
                    assert.throws(function() {
                        binaryHeap.delete();
                    });
                });

                it("returns 0 and then 1 when <0,1>", function() {
                    binaryHeap.insert(1);
                    binaryHeap.insert(0);

                    assert.equal(0, binaryHeap.delete());
                    assert.equal(1, binaryHeap.delete());
                });

                it("returns 0, 1 and then 2 when <0,2,1>", function() {
                    binaryHeap.insert(2);
                    binaryHeap.insert(1);
                    binaryHeap.insert(0);

                    assert.equal(0, binaryHeap.delete());
                    assert.equal(1, binaryHeap.delete());
                    assert.equal(2, binaryHeap.delete());
                });
            });

            describe("length()", function() {
                it("is 0 for newly created binary heap", function() {
                    assert.equal(0, binaryHeap.length());
                });

                it("is 1 when single item inserted into empty binary heap", function() {
                    binaryHeap.insert(0);
                    assert.equal(1, binaryHeap.length());
                });

                it("is 3 when 3 items inserted into empty binary heap", function() {
                    binaryHeap.insert(0);
                    binaryHeap.insert(1);
                    binaryHeap.insert(2);
                    assert.equal(3, binaryHeap.length());
                });
            });
        });
    };

    return BinaryHeapTestRunner;
})();

var testRunner = new BinaryHeapTestRunner();
testRunner.runTests();