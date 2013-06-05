var Node = (function () {
    function Node(item, node) {
        this.item = item;
        this.next = node;
    }
    
    return Node;
})();

var SinglyLinkedList = (function () {
    function SinglyLinkedList() {
        // linked list always has a dummy first element
        this.head = new Node(undefined, null);
    }

    SinglyLinkedList.prototype.toArray = function() {
        var array = [];
        var next = this.head.next;

        while(next !== null) {
            array.push(next.item);
            next = next.next;
        }

        return array;
    }

    SinglyLinkedList.prototype.add = function(item, position) {
        var current = this.head;
        var next = current.next;
        var index = 0;

        if (position < 0) {
            throw new Error("position must be positive number");
        }

        while (next !== null && index++ !== position) {
            current = next;
            next = next.next;
        }

        current.next = new Node(item, next);

        return this;
    }

    SinglyLinkedList.prototype.remove = function(position) {
        var previous = null;
        var current = this.head;
        var next = current.next;
        var index = 0;

        if (position < 0) {
            throw new Error("position must be positive number");
        }

        while (next !== null) {
            if (index++ === position) {
                current.next = next.next;
                return next.item;
            }

            current = next;
            next = next.next;
        }
    }

    SinglyLinkedList.prototype.addFromEnd = function(item, position) {
        var current = this.head;
        var next = current.next;
        var index = 0;

        if (position < 0) {
            throw new Error("position must be positive number");
        }

        while (next !== null) {
            if (index++ >= position) {
                current = current.next;
            }
            next = next.next;
        }

        current.next = new Node(item, current.next);

        return this;
    }

    SinglyLinkedList.prototype.removeFromEnd = function(position) {
        var previous = null;
        var current = this.head;
        var next = current.next;
        var index = 0;

        if (position < 0) {
            throw new Error("position must be positive number");
        }

        while (next !== null) {
            if (index++ >= position) {
                previous = current;
                current = current.next;
            }
            next = next.next;
        }

        if (previous !== null) {
            previous.next = current.next;
            return current.item;
        }
    }

    SinglyLinkedList.prototype.length = function() {
        var length = 0;
        var next = this.head.next;

        while(next !== null) {
            length++;
            next = next.next;
        }

        return length;
    }

    SinglyLinkedList.prototype.isEmpty = function() {
        return this.head.next === null;
    }

    SinglyLinkedList.prototype.reverse = function() {
        var previous = null;
        var current = this.head;
        var next = current.next;

        while (next !== null) {
            previous = current;
            current = next;
            next = next.next;
            current.next = previous;
        }

        if (this.head.next !== null) {
            this.head.next.next = null;
            this.head.next = current;
        }

        return this;
    }

    SinglyLinkedList.prototype.copy = function() {
        var list = new SinglyLinkedList();
        var copy = list.head;
        var next = this.head.next;

        while (next !== null) {
            copy.next = new Node(next.item, null);
            next = next.next;
            copy = copy.next;
        }

        return list;
    }

    SinglyLinkedList.prototype.merge = function(list) {
        var current = this.head;
        var next = current.next;

        while (next !== null) {
            current = next;
            next = next.next;
        }
        current.next = list.head.next;

        return this;
    }

    return SinglyLinkedList;
})();

module.exports.Node = Node;
module.exports.SinglyLinkedList = SinglyLinkedList;


var LinkedListTestRunner = (function () {
    function LinkedListTestRunner() {
    }

    LinkedListTestRunner.prototype.runTests = function(name, stackFactory) {
        var assert = require("assert");

        var assertMany = function(expected, actual) {
            for (var i = 0; i < actual.length; i++) {
                assert.equal(expected[i], actual[i]);
             };

            assert.equal(expected.length, actual.length);
        }

        describe(name, function() {
            var list = null;

            beforeEach(function() {
                list = stackFactory();
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

            describe("add()", function() {
                it("throws when position is negative", function() {
                    assert.throws(function() {
                        list.add(1, -1);
                    });
                });

                it("is <1> when 1 added to empty list at position 0", function() {
                    list.add(1, 0);
                    assertMany([1], list.toArray());
                });

                it("is <1> when 1 added to empty list at position 1", function() {
                    list.add(1, 1);
                    assertMany([1], list.toArray());
                });

                it("is <2,1> when 2 added to <1> at position 0", function() {
                    list.add(1, 0);
                    list.add(2, 0);
                    assertMany([2,1], list.toArray());
                });

                it("is <1,2> when 2 added to <1> at position 1", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    assertMany([1,2], list.toArray());
                });

                it("is <1,2> when 2 added to <1> at position 2", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    assertMany([1,2], list.toArray());
                });
            });

            describe("remove()", function() {
                it("throws when position is negative", function() {
                    assert.throws(function() {
                        list.remove(-1);
                    });
                });

                it("is empty list when from empty list removed at position 0", function() {
                    list.remove(0);
                    assertMany([], list.toArray());
                });

                it("is empty list when from <1> removed at position 0", function() {
                    list.add(1, 0);
                    list.remove(0);
                    assertMany([], list.toArray());
                });

                it("is <1> when from <1> removed at position 1", function() {
                    list.add(1, 0);
                    list.remove(1);
                    assertMany([1], list.toArray());
                });

                it("is <2,3> when from <1,2,3> removed at position 0", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    list.add(3, 2);
                    list.remove(0);
                    assertMany([2,3], list.toArray());
                });

                it("is <1,3> when from <1,2,3> removed at position 1", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    list.add(3, 2);
                    list.remove(1);
                    assertMany([1,3], list.toArray());
                });

                it("is <1,2> when from <1,2,3> removed at position 2", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    list.add(3, 2);
                    list.remove(2);
                    assertMany([1,2], list.toArray());
                });

                it("is <1,2,3> when from <1,2,3> removed at position 3", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    list.add(3, 2);
                    list.remove(3);
                    assertMany([1,2,3], list.toArray());
                });

                it("returns correct removed item", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    var item = list.remove(1);
                    assert.equal(2, item);
                });

                it("returns undefined when non-existing position specified", function() {
                    list.add(1, 0);
                    var item = list.remove(1);
                    assert.equal(undefined, item);
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
                    list.add(1, 0);
                    list.add(2, 1);
                    list.addFromEnd(3, 0);
                    assertMany([1,2,3], list.toArray());
                });

                it("is <1,3,2> when 3 added to <1,2> at position 1 from the end", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    list.addFromEnd(3, 1);
                    assertMany([1,3,2], list.toArray());
                });

                it("is <3,1,2> when 3 added to <1,2> at position 2 from the end", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    list.addFromEnd(3, 2);
                    assertMany([3,1,2], list.toArray());
                });

                it("is <3,1,2> when 3 added to <1,2> at position 3 from the end", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    list.addFromEnd(3, 3);
                    assertMany([3,1,2], list.toArray());
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
                    list.add(1, 0);
                    list.removeFromEnd(0);
                    assertMany([], list.toArray());
                });

                it("is <1> when from <1> removed at position 1 from the end", function() {
                    list.add(1, 0);
                    list.removeFromEnd(1);
                    assertMany([1], list.toArray());
                });

                it("is <1,2> when from <1,2,3> removed at position 0 from the end", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    list.add(3, 2);
                    list.removeFromEnd(0);
                    assertMany([1,2], list.toArray());
                });

                it("is <1,3> when from <1,2,3> removed at position 1 from the end", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    list.add(3, 2);
                    list.removeFromEnd(1);
                    assertMany([1,3], list.toArray());
                });

                it("is <2,3> when from <1,2,3> removed at position 2 from the end", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    list.add(3, 2);
                    list.removeFromEnd(2);
                    assertMany([2,3], list.toArray());
                });

                it("is <1,2,3> when from <1,2,3> removed at position 3 from the end", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    list.add(3, 2);
                    list.removeFromEnd(3);
                    assertMany([1,2,3], list.toArray());
                });

                it("returns correct removed item", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    var item = list.removeFromEnd(1);
                    assert.equal(1, item);
                });

                it("returns undefined when non-existing position specified", function() {
                    list.add(1, 0);
                    var item = list.removeFromEnd(1);
                    assert.equal(undefined, item);
                });
            });
            
            describe("length()", function() {
                it("is 0 for newly created list", function() {
                    assert.equal(0, list.length());
                });

                it("is 1 when contains 1 item", function() {
                    list.add(1, 0);
                    assert.equal(1, list.length());
                });

                it("is 3 when contains 3 items", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    list.add(3, 2);
                    assert.equal(3, list.length());
                });

                it("can call multiple times", function() {
                    list.add(1, 0);
                    list.length();
                    assert.equal(1, list.length());
                });
            });

            describe("isEmpty()", function() {
                it("is true when empty", function() {
                    assert.equal(true, list.isEmpty());
                });

                it("is false when at least 1 item exists", function() {
                    list.add(1, 0);
                    assert.equal(false, list.isEmpty());
                });
            });

            describe("reverse()", function() {
                it("is <> when empty list", function() {
                    assertMany([], list.reverse().toArray());
                });

                it("is <1> when <1>", function() {
                    list.add(1, 0);
                    assertMany([1], list.reverse().toArray());
                });

                it("is <3,2,1> when <1,2,3>", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    list.add(3, 2);
                    assertMany([3,2,1], list.reverse().toArray());
                });
            });

            describe("copy()", function() {
                it("is <> when empty list", function() {
                    assertMany([], list.copy().toArray());
                });

                it("is <1> when <1>", function() {
                    list.add(1, 0);
                    assertMany([1], list.copy().toArray());
                });

                it("is <1,2,3> when <1,2,3>", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    list.add(3, 2);
                    assertMany([1,2,3], list.copy().toArray());
                });
            });

            describe("merge()", function() {
                var anotherList;
                beforeEach(function() {
                    anotherList = new SinglyLinkedList();
                });

                it("is <> when empty list merged with empty list", function() {
                    assertMany([], list.merge(anotherList).toArray());
                });

                it("is <1> when empty list merged with <1>", function() {
                    anotherList.add(1, 0);
                    assertMany([1], list.merge(anotherList).toArray());
                });

                it("is <1> when <1> merged with empty list", function() {
                    list.add(1, 0);
                    assertMany([1], list.merge(anotherList).toArray());
                });

                it("is <1,2> when <1> merged with <2>", function() {
                    list.add(1, 0);
                    anotherList.add(2, 0);
                    assertMany([1,2], list.merge(anotherList).toArray());
                });

                it("is <1,2,3,4> when <1,2> merged with <3,4>", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    anotherList.add(3, 0);
                    anotherList.add(4, 1);
                    assertMany([1,2,3,4], list.merge(anotherList).toArray());
                });

                it("is <1,2,3,4,5> when <1,2,3> merged with <4,5>", function() {
                    list.add(1, 0);
                    list.add(2, 1);
                    list.add(3, 2);
                    anotherList.add(4, 0);
                    anotherList.add(5, 1);
                    assertMany([1,2,3,4,5], list.merge(anotherList).toArray());
                });
            });
        });
    };

    return LinkedListTestRunner;
})();

var testRunner = new LinkedListTestRunner();
testRunner.runTests("Linked list (singly)", function() { return new SinglyLinkedList(); });