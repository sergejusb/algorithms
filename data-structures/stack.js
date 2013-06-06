var LinkedList = require('./linkedList.js');

var Stack = (function () {
    function Stack() {
        this.list = new LinkedList();
    }

    Stack.prototype.push = function(item) {
        this.list.addFromStart(item, 0);
    }

    Stack.prototype.pop = function() {
        if (this.list.isEmpty()) {
            throw new Error("can not pop when stack is empty, check isEmpty() before pop()");
        }

        return this.list.removeFromStart(0);
    }

    Stack.prototype.isEmpty = function() {
        return this.list.isEmpty();
    }

    Stack.prototype.length = function() {
        return this.list.length();
    }

    return Stack;
})();


module.exports = Stack;