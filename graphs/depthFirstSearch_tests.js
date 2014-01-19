var Graph = require('./graph.js');
var DepthFirstSearch = require('./depthFirstSearch.js');

var DepthFirstSearchTestRunner = (function() {
    function DepthFirstSearchTestRunner() {
    }

    DepthFirstSearchTestRunner.prototype.runTests = function() {
        var assert = require("assert");

        var assertMany = function(expected, actual) {
            for (var i = 0; i < actual.length; i++) {
                assert.equal(expected[i], actual[i]);
             }

            assert.equal(expected.length, actual.length);
        };

        describe("Depth first search in undirected graph", function() {
            var graph;
            var dfs;

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

                dfs = new DepthFirstSearch(graph, 0);
            });

            describe("hasPathTo()", function() {
                it("returns true for vertex 5", function() {
                    assert.equal(true, dfs.hasPathTo(5));
                });

                it("returns false for vertex 12", function() {
                    assert.equal(false, dfs.hasPathTo(12));
                });
            });

            describe("pathTo()", function() {
                it("returns [5,4,6,0] for vertex 5", function() {
                    console.log(JSON.stringify(dfs.pathTo(5)));
                    assertMany([5,4,6,0], dfs.pathTo(5));
                });
            });
        });
    };

    return DepthFirstSearchTestRunner;
})();

var testRunner = new DepthFirstSearchTestRunner();
testRunner.runTests();