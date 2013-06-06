var LinkedList = require('./linkedList.js');

var Queue = (function () {
    function Queue() {
        this.list = new LinkedList();
    }

    Queue.prototype.enqueue = function(item) {
        this.list.add(item, 0);
    }

    Queue.prototype.dequeue = function() {
        if (this.list.isEmpty()) {
            throw new Error("can not dequeue when queue is empty, check isEmpty() before dequeue()");
        }

        return this.list.removeFromEnd(0);
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