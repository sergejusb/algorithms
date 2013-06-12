var Node = require('./node.js');

var Stack = (function () {
    function Stack() {
        this.head = new Node(undefined, null);
    }

    Stack.prototype.push = function(item) {
        this.head.next = new Node(item, this.head.next);
    }

    Stack.prototype.pop = function() {
        if (this.isEmpty()) {
            throw new Error("can not pop when stack is empty, check isEmpty() before pop()");
        }

        var first = this.head.next;
        this.head.next = first.next;
        return first.item;
    }

    Stack.prototype.peek = function() {
        var first = this.head.next;
        return first != null ? first.item : null;
    }

    Stack.prototype.isEmpty = function() {
        return this.head.next === null;
    }

    Stack.prototype.length = function() {
        var length = 0;
        var next = this.head.next;

        while(next !== null) {
            length++;
            next = next.next;
        }

        return length;
    }

    return Stack;
})();


module.exports = Stack;