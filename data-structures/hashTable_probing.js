var HashTable = (function() {
    function HashTable() {
        this.size = 97;
        this.keys = [];
        this.values = [];
        for (var i = 0; i < this.size; i++) {
            this.keys.push(null);
            this.values.push(null);
        }
    }

    HashTable.prototype.get = function(key) {
        var hashed = hash(key) % this.size;
        for (var i = hashed; this.keys[i] !== null; i = (i +1) % this.size) {
            if (this.keys[i] === key) return this.values[i];
        }

        return null;
    };

    HashTable.prototype.put = function(key, value) {
        var hashed = hash(key) % this.size;
        var i = null;
        for (i = hashed; this.keys[i] !== null; i = (i + 1) % this.size) {
            if (this.keys[i] === key) break;
        }
        this.keys[i] = key;
        this.values[i] = value;
    };

    function hash(input) {
        return input * 37;
    }

    return HashTable;
})();

module.exports = HashTable;