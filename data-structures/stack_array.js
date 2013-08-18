var Node = require('./node.js');

var Stack = (function () {
    function Stack() {
        this.items = new Int32Array(1) /* initial capacity */;
        this.count = 0;
    }

    Stack.prototype.push = function(item) {
        if (this.count === this.items.length) {
            this.resize(this.items.length * 2);
        }
        this.items[this.count++] = item;
    };

    Stack.prototype.pop = function() {
        if (this.isEmpty()) {
            throw new Error("can not pop when stack is empty, check isEmpty() before pop()");
        }

        var item = this.items[--this.count];
        if (this.count === this.items.length / 4) {
            this.resize(this.items.length / 2);
        }
        return item;
    };

    Stack.prototype.peek = function() {
        return this.count === 0 ? null : this.items[this.count - 1];
    };

    Stack.prototype.isEmpty = function() {
        return this.count === 0;
    };

    Stack.prototype.length = function() {
        return this.count;
    };

    Stack.prototype.resize = function(capacity) {
        var items = new Int32Array(capacity);
        for (var i = 0; i < this.count; i++) {
            items[i] = this.items[i];
        }
        this.items = items;
    };

    return Stack;
})();


module.exports = Stack;