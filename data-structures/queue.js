var Node = require('./node.js');

var Queue = (function () {
    function Queue() {
        this.head = new Node(undefined, null);
        this.last = this.head;
    }

    Queue.prototype.enqueue = function(item) {
        this.last.next = new Node(item, null);
        this.last = this.last.next;
    }

    Queue.prototype.dequeue = function() {
        if (this.isEmpty()) {
            throw new Error("can not dequeue when queue is empty, check isEmpty() before dequeue()");
        }

        var first = this.head.next;
        this.head.next = first.next;
        return first.item;
    }

    Queue.prototype.peek = function() {
        var first = this.head.next;
        return first != null ? first.item : null;
    }

    Queue.prototype.isEmpty = function() {
        return this.head.next === null;
    }

    Queue.prototype.length = function() {
        var length = 0;
        var next = this.head.next;

        while(next !== null) {
            length++;
            next = next.next;
        }

        return length;
    }

    return Queue;
})();


module.exports = Queue;