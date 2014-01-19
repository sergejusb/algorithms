var HashTableChaining = require('./hashTable_chaining.js');
var HashTableProbing = require('./hashTable_probing.js');

var HashTableTestRunner = (function() {
    function HashTableTestRunner() {
    }

    HashTableTestRunner.prototype.runTests = function(name, factory) {
        var assert = require("assert");

        describe(name, function() {
            var hashTable = null;

            beforeEach(function() {
                hashTable = factory();
            });

            describe("get()", function() {
                it("returns null for not existing key", function() {
                    assert.equal(null, hashTable.get(1));
                });

                it("returns not null for existing key", function() {
                    hashTable.put(1, 'a');

                    assert.notEqual(null, hashTable.get(1));
                });
            });

            describe("put()", function() {
                it("inserts single {key,value} pair", function() {
                    hashTable.put(1, 'a');
                    
                    assert.equal('a', hashTable.get(1));
                });

                it("inserts multiple {key,value} pairs", function() {
                    hashTable.put(1, 'a');
                    hashTable.put(2, 'b');

                    assert.equal('a', hashTable.get(1));
                    assert.equal('b', hashTable.get(2));
                });

                it("updated value of existing {key,value} pair", function() {
                    hashTable.put(1, 'a');
                    hashTable.put(1, 'b');

                    assert.equal('b', hashTable.get(1));
                });
            });
        });
    };

    return HashTableTestRunner;
})();

var testRunner = new HashTableTestRunner();
testRunner.runTests("Hash Table (separate chaining)", function() { return new HashTableChaining(); });
testRunner.runTests("Hash Table (linear probing)", function() { return new HashTableProbing(); });