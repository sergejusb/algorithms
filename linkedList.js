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

    SinglyLinkedList.prototype.length = function() {
        var length = 0;
        var next = this.head.next;

        while(next !== null) {
            length++;
            next = next.next;
        }

        return length;
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

    /*
    function find(item) {
        return throw Error("not implemented");
    }

    function delete(item) {
        return throw Error("not implemented");
    }

    */

    return SinglyLinkedList;
})();

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

                it("throws when position is negative", function() {
                    assert.throws(function() {
                        list.add(1, -1);
                    });
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
                    list.add(1,0);
                    list.add(2,1);
                    list.add(3,2);
                    assert.equal(3, list.length());
                });

                it("can call multiple times", function() {
                    list.add(1,0);
                    list.length();
                    assert.equal(1, list.length());
                });
            });

            describe("reverse()", function() {
                it("is <> when empty list", function() {
                    assertMany([], list.reverse().toArray());
                });

                it("is <1> when <1>", function() {
                    list.add(1,0);
                    assertMany([1], list.reverse().toArray());
                });

                it("is <3,2,1> when <1,2,3>", function() {
                    list.add(1,0);
                    list.add(2,1);
                    list.add(3,2);
                    assertMany([3,2,1], list.reverse().toArray());
                });
            });

            describe("copy()", function() {
                it("is <> when empty list", function() {
                    assertMany([], list.copy().toArray());
                });

                it("is <1> when <1>", function() {
                    list.add(1,0);
                    assertMany([1], list.copy().toArray());
                });

                it("is <1,2,3> when <1,2,3>", function() {
                    list.add(1,0);
                    list.add(2,1);
                    list.add(3,2);
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
                    anotherList.add(1,0);
                    assertMany([1], list.merge(anotherList).toArray());
                });

                it("is <1> when <1> merged with empty list", function() {
                    list.add(1,0);
                    assertMany([1], list.merge(anotherList).toArray());
                });

                it("is <1,2> when <1> merged with <2>", function() {
                    list.add(1,0);
                    anotherList.add(2,0);
                    assertMany([1,2], list.merge(anotherList).toArray());
                });

                it("is <1,2,3,4> when <1,2> merged with <3,4>", function() {
                    list.add(1,0);
                    list.add(2,1);
                    anotherList.add(3,0);
                    anotherList.add(4,1);
                    assertMany([1,2,3,4], list.merge(anotherList).toArray());
                });

                it("is <1,2,3,4,5> when <1,2,3> merged with <4,5>", function() {
                    list.add(1,0);
                    list.add(2,1);
                    list.add(3,2);
                    anotherList.add(4,0);
                    anotherList.add(5,1);
                    assertMany([1,2,3,4,5], list.merge(anotherList).toArray());
                });
            });
        });
    };

    return LinkedListTestRunner;
})();

var testRunner = new LinkedListTestRunner();
testRunner.runTests("Linked list (singly)", function() { return new SinglyLinkedList(); });