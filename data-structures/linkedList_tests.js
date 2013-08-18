var Node = require('./node.js');
var LinkedList = require('./linkedList.js');

var LinkedListTestRunner = (function () {
    function LinkedListTestRunner() {
    }

    LinkedListTestRunner.prototype.runTests = function(name, factory) {
        var assert = require("assert");

        var assertMany = function(expected, actual) {
            for (var i = 0; i < actual.length; i++) {
                assert.equal(expected[i], actual[i]);
             }

            assert.equal(expected.length, actual.length);
        };

        describe(name, function() {
            var list = null;

            beforeEach(function() {
                list = factory();
            });

            describe("toArray()", function() {
                it("is [] when empty list", function() {
                    assertMany([], list.toArray());
                });

                it("is [1] when list has <1>", function() {
                    list.head = new Node(undefined, new Node(1, null));
                    assertMany([1], list.toArray());
                });

                it("is [1,2,3] when list has <1,2,3>", function() {
                    list.head = new Node(undefined, new Node(1, new Node(2, new Node(3, null))));
                    assertMany([1,2,3], list.toArray());
                });
            });

            describe("isEmpty()", function() {
                it("is true when empty", function() {
                    assert.equal(true, list.isEmpty());
                });

                it("is false when at least 1 item exists", function() {
                    list.addFromStart(1, 0);
                    assert.equal(false, list.isEmpty());
                });
            });

            describe("length()", function() {
                it("is 0 for newly created list", function() {
                    assert.equal(0, list.length());
                });

                it("is 1 when contains 1 item", function() {
                    list.addFromStart(1, 0);
                    assert.equal(1, list.length());
                });

                it("is 3 when contains 3 items", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    list.addFromStart(3, 2);
                    assert.equal(3, list.length());
                });

                it("can call multiple times", function() {
                    list.addFromStart(1, 0);
                    list.length();
                    assert.equal(1, list.length());
                });
            });

            describe("find()", function() {
                it("returns null when list is empty", function() {
                    var node = list.find(1);
                    assert.equal(null, node);
                });

                it("returns null when node not found", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 0);
                    var node = list.find(3);
                    assert.equal(null, node);
                });

                it("returns node when is found", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 0);
                    var node = list.find(2);
                    assert.equal(2, node.item);
                });
            });

            describe("addBefore()", function() {
                it("throws when node is null", function() {
                    assert.throws(function() {
                        list.addBefore(null, 1);
                    });
                });

                it("is <2,1> when 2 added to <1> before 1", function() {
                    list.addFromStart(1, 0);
                    var node = list.find(1);
                    list.addBefore(node, 2);
                    assertMany([2,1], list.toArray());
                });

                it("is <1,3,2> when 3 added to <1,2> before 2", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    var node = list.find(2);
                    list.addBefore(node, 3);
                    assertMany([1,3,2], list.toArray());
                });
            });

            describe("addAfter()", function() {
                it("throws when node is null", function() {
                    assert.throws(function() {
                        list.addAfter(null, 1);
                    });
                });

                it("is <1,2> when 2 added to <1> after 1", function() {
                    list.addFromStart(1, 0);
                    var node = list.find(1);
                    list.addAfter(node, 2);
                    assertMany([1,2], list.toArray());
                });

                it("is <1,3,2> when 3 added to <1,2> after 1", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    var node = list.find(1);
                    list.addAfter(node, 3);
                    assertMany([1,3,2], list.toArray());
                });
            });

            describe("addFromStart()", function() {
                it("throws when position is negative", function() {
                    assert.throws(function() {
                        list.addFromStart(1, -1);
                    });
                });

                it("is <1> when 1 added to empty list at position 0", function() {
                    list.addFromStart(1, 0);
                    assertMany([1], list.toArray());
                });

                it("is <1> when 1 added to empty list at position 1", function() {
                    list.addFromStart(1, 1);
                    assertMany([1], list.toArray());
                });

                it("is <2,1> when 2 added to <1> at position 0", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 0);
                    assertMany([2,1], list.toArray());
                });

                it("is <1,2> when 2 added to <1> at position 1", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    assertMany([1,2], list.toArray());
                });

                it("is <1,2> when 2 added to <1> at position 2", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    assertMany([1,2], list.toArray());
                });
            });

            describe("addFromEnd()", function() {
                it("throws when position is negative", function() {
                    assert.throws(function() {
                        list.addFromEnd(1, -1);
                    });
                });

                it("is <1> when 1 added to empty list at position 0 from the end", function() {
                    list.addFromEnd(1, 0);
                    assertMany([1], list.toArray());
                });

                it("is <1> when 1 added to empty list at position 1 from the end", function() {
                    list.addFromEnd(1, 1);
                    assertMany([1], list.toArray());
                });

                it("is <1,2,3> when 3 added to <1,2> at position 0 from the end", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    list.addFromEnd(3, 0);
                    assertMany([1,2,3], list.toArray());
                });

                it("is <1,3,2> when 3 added to <1,2> at position 1 from the end", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    list.addFromEnd(3, 1);
                    assertMany([1,3,2], list.toArray());
                });

                it("is <3,1,2> when 3 added to <1,2> at position 2 from the end", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    list.addFromEnd(3, 2);
                    assertMany([3,1,2], list.toArray());
                });

                it("is <3,1,2> when 3 added to <1,2> at position 3 from the end", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    list.addFromEnd(3, 3);
                    assertMany([3,1,2], list.toArray());
                });
            });

            describe("remove()", function() {
                it("throws when node is null", function() {
                    assert.throws(function() {
                        list.remove(null, 1);
                    });
                });

                it("is empty list when 1 removed from <1>", function() {
                    list.addFromStart(1, 0);
                    var node = list.find(1);
                    list.remove(node);
                    assertMany([], list.toArray());
                });

                it("is <2> when 1 removed from <1,2>", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    var node = list.find(1);
                    list.remove(node);
                    assertMany([2], list.toArray());
                });

                it("is <1> when 2 removed from <1,2>", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    var node = list.find(2);
                    list.remove(node);
                    assertMany([1], list.toArray());
                });
            })

            describe("removeFromStart()", function() {
                it("throws when position is negative", function() {
                    assert.throws(function() {
                        list.removeFromStart(-1);
                    });
                });

                it("is empty list when from empty list removed at position 0", function() {
                    list.removeFromStart(0);
                    assertMany([], list.toArray());
                });

                it("is empty list when from <1> removed at position 0", function() {
                    list.addFromStart(1, 0);
                    list.removeFromStart(0);
                    assertMany([], list.toArray());
                });

                it("is <1> when from <1> removed at position 1", function() {
                    list.addFromStart(1, 0);
                    list.removeFromStart(1);
                    assertMany([1], list.toArray());
                });

                it("is <2,3> when from <1,2,3> removed at position 0", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    list.addFromStart(3, 2);
                    list.removeFromStart(0);
                    assertMany([2,3], list.toArray());
                });

                it("is <1,3> when from <1,2,3> removed at position 1", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    list.addFromStart(3, 2);
                    list.removeFromStart(1);
                    assertMany([1,3], list.toArray());
                });

                it("is <1,2> when from <1,2,3> removed at position 2", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    list.addFromStart(3, 2);
                    list.removeFromStart(2);
                    assertMany([1,2], list.toArray());
                });

                it("is <1,2,3> when from <1,2,3> removed at position 3", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    list.addFromStart(3, 2);
                    list.removeFromStart(3);
                    assertMany([1,2,3], list.toArray());
                });

                it("returns correct removed item", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    var item = list.removeFromStart(1);
                    assert.equal(2, item);
                });

                it("returns undefined when non-existing position specified", function() {
                    list.addFromStart(1, 0);
                    var item = list.removeFromStart(1);
                    assert.equal(undefined, item);
                });
            });

            describe("removeFromEnd()", function() {
                it("throws when position is negative", function() {
                    assert.throws(function() {
                        list.removeFromEnd(-1);
                    });
                });

                it("is empty list when from empty list removed at position 0 from the end", function() {
                    list.removeFromEnd(0);
                    assertMany([], list.toArray());
                });

                it("is empty list when from <1> removed at position 0 from the end", function() {
                    list.addFromStart(1, 0);
                    list.removeFromEnd(0);
                    assertMany([], list.toArray());
                });

                it("is <1> when from <1> removed at position 1 from the end", function() {
                    list.addFromStart(1, 0);
                    list.removeFromEnd(1);
                    assertMany([1], list.toArray());
                });

                it("is <1,2> when from <1,2,3> removed at position 0 from the end", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    list.addFromStart(3, 2);
                    list.removeFromEnd(0);
                    assertMany([1,2], list.toArray());
                });

                it("is <1,3> when from <1,2,3> removed at position 1 from the end", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    list.addFromStart(3, 2);
                    list.removeFromEnd(1);
                    assertMany([1,3], list.toArray());
                });

                it("is <2,3> when from <1,2,3> removed at position 2 from the end", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    list.addFromStart(3, 2);
                    list.removeFromEnd(2);
                    assertMany([2,3], list.toArray());
                });

                it("is <1,2,3> when from <1,2,3> removed at position 3 from the end", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    list.addFromStart(3, 2);
                    list.removeFromEnd(3);
                    assertMany([1,2,3], list.toArray());
                });

                it("returns correct removed item", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    var item = list.removeFromEnd(1);
                    assert.equal(1, item);
                });

                it("returns undefined when non-existing position specified", function() {
                    list.addFromStart(1, 0);
                    var item = list.removeFromEnd(1);
                    assert.equal(undefined, item);
                });
            });

            describe("reverse()", function() {
                it("is <> when empty list", function() {
                    assertMany([], list.reverse().toArray());
                });

                it("is <1> when <1>", function() {
                    list.addFromStart(1, 0);
                    assertMany([1], list.reverse().toArray());
                });

                it("is <3,2,1> when <1,2,3>", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    list.addFromStart(3, 2);
                    assertMany([3,2,1], list.reverse().toArray());
                });
            });

            describe("copy()", function() {
                it("is <> when empty list", function() {
                    assertMany([], list.copy().toArray());
                });

                it("is <1> when <1>", function() {
                    list.addFromStart(1, 0);
                    assertMany([1], list.copy().toArray());
                });

                it("is <1,2,3> when <1,2,3>", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    list.addFromStart(3, 2);
                    assertMany([1,2,3], list.copy().toArray());
                });
            });

            describe("merge()", function() {
                var anotherList;
                beforeEach(function() {
                    anotherList = factory();
                });

                it("is <> when empty list merged with empty list", function() {
                    assertMany([], list.merge(anotherList).toArray());
                });

                it("is <1> when empty list merged with <1>", function() {
                    anotherList.addFromStart(1, 0);
                    assertMany([1], list.merge(anotherList).toArray());
                });

                it("is <1> when <1> merged with empty list", function() {
                    list.addFromStart(1, 0);
                    assertMany([1], list.merge(anotherList).toArray());
                });

                it("is <1,2> when <1> merged with <2>", function() {
                    list.addFromStart(1, 0);
                    anotherList.addFromStart(2, 0);
                    assertMany([1,2], list.merge(anotherList).toArray());
                });

                it("is <1,2,3,4> when <1,2> merged with <3,4>", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    anotherList.addFromStart(3, 0);
                    anotherList.addFromStart(4, 1);
                    assertMany([1,2,3,4], list.merge(anotherList).toArray());
                });

                it("is <1,2,3,4,5> when <1,2,3> merged with <4,5>", function() {
                    list.addFromStart(1, 0);
                    list.addFromStart(2, 1);
                    list.addFromStart(3, 2);
                    anotherList.addFromStart(4, 0);
                    anotherList.addFromStart(5, 1);
                    assertMany([1,2,3,4,5], list.merge(anotherList).toArray());
                });
            });
        });
    };

    return LinkedListTestRunner;
})();

var testRunner = new LinkedListTestRunner();
testRunner.runTests("Linked list (singly)", function() { return new LinkedList(); });