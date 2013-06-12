var Node = require('./node.js');
var LinkedList = require('./LinkedList.js');

var Queue = (function () {
    function Queue() {
        this.list = new LinkedList();
        this.last = this.list.head;
    }

    Queue.prototype.enqueue = function(item) {
        this.last.next = new Node(item, null);
        this.last = this.last.next;
    }

    Queue.prototype.dequeue = function() {
        if (this.isEmpty()) {
            throw new Error("can not dequeue when queue is empty, check isEmpty() before dequeue()");
        }

        return this.list.removeFromStart(0);
    }

    Queue.prototype.peek = function() {
        var node = this.list.head.next;
        return node != null ? node.item : null;
    }

    Queue.prototype.isEmpty = function() {
        return this.list.isEmpty();
    }

    Queue.prototype.length = function() {
        return this.list.length();
    }

    return Queue;
})();


module.exports = Queue;