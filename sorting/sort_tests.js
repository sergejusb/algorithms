var selectionSort = require('./selectionSort.js');
var insertionSort = require('./insertionSort.js');
var shellSort = require('./shellSort.js');
var mergeSort = require('./mergeSort.js');

var SortTestRunner = (function() {
    function SortTestRunner() {
    }

    SortTestRunner.prototype.runTests = function(sortFunction) {
        var assert = require("assert");

        var assertMany = function(expected, actual) {
            for (var i = 0; i < actual.length; i++) {
                assert.equal(expected[i], actual[i]);
             };

            assert.equal(expected.length, actual.length);
        }

        describe(sortFunction.name + "()", function() {
            it("can sort empty array", function() {
                assertMany([], sortFunction([]));
            });

            it("can sort single number", function() {
                assertMany([1], sortFunction([1]));
            });

            it("can sort unique numbers", function() {
                assertMany([1,2,3,4,5], sortFunction([4,1,3,5,2]));
            });

            it("can sort non-unique numbers", function() {
                assertMany([1,1,2,3,3,4,5], sortFunction([3,4,1,3,5,1,2]));
            });

            it("can sort negative numbers", function() {
                assertMany([-2,-1,0,0,1,2], sortFunction([1,0,-2,2,-1,0]));
            });

            it("can sort sorted numbers", function() {
                assertMany([-2,-1,0,1,2], sortFunction([-2,-1,0,1,2]));
            });
        });
    }

    return SortTestRunner;
})();

var testRunner = new SortTestRunner();
testRunner.runTests(selectionSort);
testRunner.runTests(insertionSort);
testRunner.runTests(shellSort);
testRunner.runTests(mergeSort);