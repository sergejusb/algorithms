var selectionSort = require('./selectionSort.js');
var bubbleSort = require('./bubbleSort.js');
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
             }

            assert.equal(expected.length, actual.length);
        };

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

            it("can sort big sequence of numbers", function() {
                assertMany([1,2,4,6,9,11,12,13,20,23,28,30,32,33,44,45,46,47,49,50,51,53,55,58,59,60,62,64,65,66,68,69,71,73,77,78,81,83,84,85,86,87,90,91,93,94,95,96,99,100], sortFunction([68,20,51,44,84,64,60,11,9,13,32,83,96,87,55,28,99,86,2,12,33,50,85,66,71,62,23,91,53,73,77,100,46,59,65,90,4,93,81,47,45,30,6,1,78,49,94,58,95,69]));
            });
        });
    };

    return SortTestRunner;
})();

var testRunner = new SortTestRunner();
testRunner.runTests(selectionSort);
testRunner.runTests(bubbleSort);
testRunner.runTests(insertionSort);
testRunner.runTests(shellSort);
testRunner.runTests(mergeSort);