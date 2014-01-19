var Graph = require('./graph.js');
var BreadthFirstSearch = require('./breadthFirstSearch.js');

var BreadthFirstSearchTestRunner = (function() {
    function BreadthFirstSearchTestRunner() {
    }

    BreadthFirstSearchTestRunner.prototype.runTests = function() {
        var assert = require("assert");

        var assertMany = function(expected, actual) {
            for (var i = 0; i < actual.length; i++) {
                assert.equal(expected[i], actual[i]);
             }

            assert.equal(expected.length, actual.length);
        };

        describe("Breadth first search in undirected graph", function() {
            var graph;
            var bfs;

            beforeEach(function() {
                graph = new Graph(13);
                graph.addEdge(0, 5);
                graph.addEdge(4, 3);
                graph.addEdge(0, 1);
                graph.addEdge(9, 12);
                graph.addEdge(6, 4);
                graph.addEdge(5, 4);
                graph.addEdge(0, 2);
                graph.addEdge(11, 12);
                graph.addEdge(9, 10);
                graph.addEdge(0, 6);
                graph.addEdge(7, 8);
                graph.addEdge(9, 11);
                graph.addEdge(5, 3);

                bfs = new BreadthFirstSearch(graph, 0);
            });

            describe("hasPathTo()", function() {
                it("returns true for vertex 5", function() {
                    assert.equal(true, bfs.hasPathTo(5));
                });

                it("returns false for vertex 12", function() {
                    assert.equal(false, bfs.hasPathTo(12));
                });
            });

            describe("pathTo()", function() {
                it("returns [3,5,0] for vertex 3", function() {
                    assertMany([3,5,0], bfs.pathTo(3));
                });
            });
        });
    };

    return BreadthFirstSearchTestRunner;
})();

var testRunner = new BreadthFirstSearchTestRunner();
testRunner.runTests();