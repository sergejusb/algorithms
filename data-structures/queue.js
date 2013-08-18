var Node = require('./node.js');

var Queue = (function () {
    function Queue() {
        this.head = new Node(undefined, null);
        this.last = this.head;
        this.count = 0;
    }

    Queue.prototype.enqueue = function(item) {
        this.last.next = new Node(item, null);
        this.last = this.last.next;
        this.count++;
    };

    Queue.prototype.dequeue = function() {
        if (this.isEmpty()) {
            throw new Error("can not dequeue when queue is empty, check isEmpty() before dequeue()");
        }

        var first = this.head.next;
        this.head.next = first.next;
        this.count--;
        return first.item;
    };

    Queue.prototype.peek = function() {
        var first = this.head.next;
        return first !== null ? first.item : null;
    };

    Queue.prototype.isEmpty = function() {
        return this.head.next === null;
    };

    Queue.prototype.length = function() {
        return this.count;
    };

    return Queue;
})();


module.exports = Queue;