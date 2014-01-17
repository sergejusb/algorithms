var BinarySearchTree = require('./binarySearchTree.js');

var BinarySearchTreeTestRunner = (function() {
    function BinarySearchTreeTestRunner() {
    }

    BinarySearchTreeTestRunner.prototype.runTests = function() {
        var assert = require("assert");
        var assertMany = function(expected, actual) {
            for (var i = 0; i < actual.length; i++) {
                assert.equal(expected[i], actual[i]);
             }

            assert.equal(expected.length, actual.length);
        };

        var tree;
        beforeEach(function() {
            tree = new BinarySearchTree();
        });

        describe("Binary Search Tree", function() {
            describe("search()", function() {
                it("returns 'a' when binary search tree contains item {1,'a'}", function() {
                    tree.insert(1, 'a');

                    assert.equal('a', tree.search(1));
                });

                it("returns null when binary search tree does not contain item {1,'a'}", function() {
                    tree.insert(2, 'b');

                    assert.equal(null, tree.search(1));
                });
            });

            describe("insert()", function() {
                it("can insert {1,'a'} into empty binary search tree", function() {
                    tree.insert(1, 'a');

                    assert.equal('a', tree.search(1));
                });
                it("can insert {1,'b'} when {1,'a'} already exist", function() {
                    tree.insert(1, 'a');
                    tree.insert(1, 'b');

                    assert.equal('b', tree.search(1));
                });
            });

            describe("delete()", function() {
                it("can delete leaves", function() {
                    tree.insert(5, 5);
                    tree.insert(2, 2);
                    tree.insert(9, 9);
                    tree.insert(1, 1);
                    tree.insert(4, 4);
                    tree.insert(7, 7);
                    tree.insert(10, 10);
                    tree.insert(3, 3);
                    tree.insert(6, 6);
                    tree.insert(8 ,8);

                    tree.delete(1);
                    tree.delete(10);

                    assertMany([5,2,9,4,7,3,6,8], tree.traverseLevelOrder());
                });

                it("can delete node with single child", function() {
                    tree.insert(5, 5);
                    tree.insert(2, 2);
                    tree.insert(9, 9);
                    tree.insert(1, 1);
                    tree.insert(4, 4);
                    tree.insert(7, 7);
                    tree.insert(10, 10);
                    tree.insert(3, 3);
                    tree.insert(6, 6);
                    tree.insert(8 ,8);

                    tree.delete(4);

                    assertMany([5,2,9,1,3,7,10,6,8], tree.traverseLevelOrder());
                });

                it("can delete node with two children", function() {
                    tree.insert(5, 5);
                    tree.insert(2, 2);
                    tree.insert(9, 9);
                    tree.insert(1, 1);
                    tree.insert(4, 4);
                    tree.insert(7, 7);
                    tree.insert(10, 10);
                    tree.insert(3, 3);
                    tree.insert(6, 6);
                    tree.insert(8 ,8);

                    tree.delete(7);

                    assertMany([5,2,9,1,4,8,10,3,6], tree.traverseLevelOrder());
                });

                it("can delete root", function() {
                    tree.insert(5, 5);
                    tree.insert(2, 2);
                    tree.insert(9, 9);
                    tree.insert(1, 1);
                    tree.insert(4, 4);
                    tree.insert(7, 7);
                    tree.insert(10, 10);
                    tree.insert(3, 3);
                    tree.insert(6, 6);
                    tree.insert(8 ,8);

                    tree.delete(5);

                    assertMany([6,2,9,1,4,7,10,3,8], tree.traverseLevelOrder());
                });
            });

            describe("range()", function() {
                it("returns ['h','l','m','p','r','s'] when range is ['f'..'t']", function() {
                    tree.insert('s', 's');
                    tree.insert('e', 'e');
                    tree.insert('x', 'x');
                    tree.insert('a', 'a');
                    tree.insert('r', 'r');
                    tree.insert('c', 'c');
                    tree.insert('h', 'h');
                    tree.insert('m', 'm');
                    tree.insert('l', 'l');
                    tree.insert('p', 'p');

                    assertMany(['h','l','m','p','r','s'], tree.range('f', 't'));
                });
            });

            describe("traversePreOrder()", function() {
                it("can correctly traverse binary search tree pre-order", function() {
                    tree.insert('f', 'f');
                    tree.insert('b', 'b');
                    tree.insert('g', 'g');
                    tree.insert('a', 'a');
                    tree.insert('d', 'd');
                    tree.insert('i', 'i');
                    tree.insert('c', 'c');
                    tree.insert('e', 'e');
                    tree.insert('h', 'h');

                    assertMany(['f','b','a','d','c','e','g','i','h'], tree.traversePreOrder());
                });
            });

            describe("traverseInOrder()", function() {
                it("can correctly traverse binary search tree in-order", function() {
                    tree.insert('f', 'f');
                    tree.insert('b', 'b');
                    tree.insert('g', 'g');
                    tree.insert('a', 'a');
                    tree.insert('d', 'd');
                    tree.insert('i', 'i');
                    tree.insert('c', 'c');
                    tree.insert('e', 'e');
                    tree.insert('h', 'h');

                    assertMany(['a','b','c','d','e','f','g','h','i'], tree.traverseInOrder());
                });
            });

            describe("traversePostOrder()", function() {
                it("can correctly traverse binary search tree post-order", function() {
                    tree.insert('f', 'f');
                    tree.insert('b', 'b');
                    tree.insert('g', 'g');
                    tree.insert('a', 'a');
                    tree.insert('d', 'd');
                    tree.insert('i', 'i');
                    tree.insert('c', 'c');
                    tree.insert('e', 'e');
                    tree.insert('h', 'h');

                    assertMany(['a','c','e','d','b','h','i','g','f'], tree.traversePostOrder());
                });
            });

            describe("traverseLevelOrder()", function() {
                it("can correctly traverse binary search tree level-order", function() {
                    tree.insert('f', 'f');
                    tree.insert('b', 'b');
                    tree.insert('g', 'g');
                    tree.insert('a', 'a');
                    tree.insert('d', 'd');
                    tree.insert('i', 'i');
                    tree.insert('c', 'c');
                    tree.insert('e', 'e');
                    tree.insert('h', 'h');

                    assertMany(['f','b','g','a','d','i','c','e','h'], tree.traverseLevelOrder());
                });
            });
        });
    };

    return BinarySearchTreeTestRunner;
})();

var testRunner = new BinarySearchTreeTestRunner();
testRunner.runTests();