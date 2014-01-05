var BinaryHeap = (function() {
    function BinaryHeap(predicate) {
        this.predicate = predicate || function(a, b) { return a > b; };

        this.items = new Int32Array(1 + 1) /* zero index + initial capacity */;
        this.count = 0;
    }

    BinaryHeap.prototype.toArray = function() {
        var array = [];
        for (var i = 1; i <= this.count; i++) {
            array.push(this.items[i]);
        }
        return array;
    };

    BinaryHeap.prototype.insert = function(item) {
        this.items[++this.count] = item;
        
        /* ensure binary heap invariant */
        var child = this.count;
        var parent = child >> 1;
        while (child > 1 && this.predicate(this.items[child], this.items[parent])) {
            var tmp = this.items[child];
            this.items[child] = this.items[parent];
            this.items[parent] = tmp;
            
            child = parent;
            parent = child >> 1;
        }

        /* expand array if necessary */
        if (this.count === this.items.length - 1) {
            this.resize(this.count * 2 + 1);
        }
    };

    BinaryHeap.prototype.delete = function() {
        if (this.count === 0) throw "Heap is empty";

        var item = this.items[1];
        this.items[1] = this.items[this.count];
        this.items[this.count--] = null;

        /* ensure binary heap invariant */
        var parent = 1;
        var child = parent << 1;
        while (child <= this.count) {
            if (child < this.count) {
                child = this.predicate(this.items[child], this.items[child + 1]) ? child : child + 1;
            }
            
            if (this.predicate(this.items[parent], this.items[child])) break;

            var tmp = this.items[parent];
            this.items[parent] = this.items[child];
            this.items[child] = tmp;

            parent = child;
            child = parent << 1;
        }

        /* shrink array if necessary */
        if (this.count === this.items.length / 4) {
            resize(this.count * 2 + 1);
        }

        return item;
    };

    BinaryHeap.prototype.length = function() {
        return this.count;
    };

    BinaryHeap.prototype.resize = function(capacity) {
        var items = new Int32Array(capacity);
        for (var i = 0; i <= this.count; i++) {
            items[i] = this.items[i];
        }
        this.items = items;
    };

    return BinaryHeap;
})();

module.exports = BinaryHeap;