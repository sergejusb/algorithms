var Item = (function() {
    function Item(value, priority) {
        this.value = value;
        this.priority = priority;
    }

    return Item;
})();

var MaxPriorityQueue = (function() {
    function MaxPriorityQueue() {
        this.items = [null];
        this.count = 0;
    }

    MaxPriorityQueue.prototype.insert = function(value, priority) {
        this.items.push(new Item(value, priority));
        this.count++;
        
        /* ensure binary heap invariant */
        var child = this.count;
        var parent = child >> 1;
        while (child > 1 && this.items[child].priority > this.items[parent].priority) {
            var tmp = this.items[child];
            this.items[child] = this.items[parent];
            this.items[parent] = tmp;
            
            child = parent;
            parent = child >> 1;
        }
    };

    MaxPriorityQueue.prototype.findMax  = function() {
        if (this.count === 0) throw "Priority queue is empty";

        return this.items[1].value;
    };

    MaxPriorityQueue.prototype.deleteMax = function() {
        if (this.count === 0) throw "Priority queue is empty";

        var item = this.items[1];
        this.items[1] = this.items.pop();
        this.count--;

        /* ensure binary heap invariant */
        var parent = 1;
        var child = parent << 1;
        while (child <= this.count) {
            if (child < this.count) {
                child = this.items[child].priority > this.items[child + 1].priority ? child : child + 1;
            }
            
            if (this.items[parent].priority > this.items[child].priority) break;

            var tmp = this.items[parent];
            this.items[parent] = this.items[child];
            this.items[child] = tmp;

            parent = child;
            child = parent << 1;
        }

        return item.value;
    };

    MaxPriorityQueue.prototype.length = function() {
        return this.count;
    };

    return MaxPriorityQueue;
})();

module.exports = MaxPriorityQueue;