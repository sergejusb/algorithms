var Node = require('./node.js');

var Stack = (function () {
    function Stack() {
        this.head = new Node(undefined, null);
        this.count = 0;
    }

    Stack.prototype.push = function(item) {
        this.head.next = new Node(item, this.head.next);
        this.count++;
    };

    Stack.prototype.pop = function() {
        if (this.isEmpty()) {
            throw new Error("can not pop when stack is empty, check isEmpty() before pop()");
        }

        var first = this.head.next;
        this.head.next = first.next;
        this.count--;
        return first.item;
    };

    Stack.prototype.peek = function() {
        var first = this.head.next;
        return first !== null ? first.item : null;
    };

    Stack.prototype.isEmpty = function() {
        return this.head.next === null;
    };

    Stack.prototype.length = function() {
        return this.count;
    };

    return Stack;
})();


module.exports = Stack;