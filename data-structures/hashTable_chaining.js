var Node = (function() {
    function Node(key, value, next) {
        this.key = key;
        this.value = value;
        this.next = null;
    }

    return Node;
})();

var HashTable = (function() {
    function HashTable() {
        this.size = 37;
        this.items = [];
        for (var i = 0; i < this.size; i++) {
            this.items.push(null);
        }
    }

    HashTable.prototype.get = function(key) {
        var hashed = hash(key) % this.size;
        for (var node = this.items[hashed]; node !== null; node = node.next) {
            if (node.key === key) return node.value;
        }

        return null;
    };

    HashTable.prototype.put = function(key, value) {
        var hashed = hash(key) % this.size;
        for (var node = this.items[hashed]; node !== null; node = node.next) {
            if (node.key === key) {
                node.value = value;
                return;
            }
        }

        this.items[hashed] = new Node(key, value, this.items[hashed]);
    };

    function hash(input) {
        return input * 97;
    }

    return HashTable;
})();

module.exports = HashTable;