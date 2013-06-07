var Node = require('./node.js');

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

    SinglyLinkedList.prototype.isEmpty = function() {
        return this.head.next === null;
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

    SinglyLinkedList.prototype.find = function(item) {
        var next = this.head.next;

        while (next !== null) {
            if (next.item === item) {
                return next;
            }

            next = next.next;
        }
    }

    SinglyLinkedList.prototype.addBefore = function(node, item) {
        var current = this.head;
        var next = current.next;

        if (node == null) {
            throw new Error("node can not be null");
        }

        while (next !== null) {
            if (next === node) {
                current.next = new Node(item, next);
            }

            current = next;
            next = next.next;
        }
    }

    SinglyLinkedList.prototype.addAfter = function(node, item) {
        var next = this.head.next;

        if (node == null) {
            throw new Error("node can not be null");
        }

        while (next !== null) {
            if (next === node) {
                next.next = new Node(item, next.next);
                return this;
            }

            next = next.next;
        }
    }

    SinglyLinkedList.prototype.addFromStart = function(item, position) {
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
    }

    SinglyLinkedList.prototype.remove = function(node) {
        var current = this.head;
        var next = current.next;

        if (node == null) {
            throw new Error("node can not be null");
        }

        while (next !== null) {
            if (next === node) {
                current.next = next.next;
            }

            current = next;
            next = next.next;
        }
    }

    SinglyLinkedList.prototype.removeFromStart = function(position) {
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


module.exports = SinglyLinkedList;