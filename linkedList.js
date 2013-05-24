var Node = (function () {
    function Node(data, node) {
        this.data = data;
        this.next = node;
    }
    
    return Node;
})();

var SinglyLinkedList = (function () {
    function SinglyLinkedList() {
        this.head = null;
    }

    SinglyLinkedList.prototype.length = function() {
        var length = 0;
        var current = this.head;
        while (this.head != null) {
            length++;
            this.head = this.head.next;
        }

        return length;
    }
    
    return SinglyLinkedList;
})();

var assert = require("assert");
describe("SinglyLinkedList", function() {
    var linkedList = null;
    before(function() {
        linkedList = new SinglyLinkedList();
    });

    describe("length()", function() {
        it("is 0 for newly created list", function() {
            assert.equal(0, linkedList.length());
        });

        it("is 1 when contains 1 node", function() {
            linkedList.head = new Node(0, null);
            assert.equal(1, linkedList.length());
        });

        it("is 2 when contains 2 nodes", function() {
            linkedList.head = new Node(0, new Node(1, null));
            assert.equal(2, linkedList.length());
        });

        it("is 3 when contains 3 nodes", function() {
            linkedList.head = new Node(0, new Node(1, new Node(2, null)));
            assert.equal(3, linkedList.length());
        });
    });
});