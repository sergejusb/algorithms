var Digraph = require('./digraph.js');

var DigraphTestRunner = (function() {
    function DigraphTestRunner() {
    }

    DigraphTestRunner.prototype.runTests = function() {
        var assert = require("assert");

        var assertMany = function(expected, actual) {
            for (var i = 0; i < actual.length; i++) {
                assert.equal(expected[i], actual[i]);
             }

            assert.equal(expected.length, actual.length);
        };

        describe("Directional graph", function() {
            describe("vertices()", function() {
                it("returns passed number of vertices to constructor", function() {
                    var graph = new Digraph(4);

                    assert.equal(4, graph.vertices());
                });
            });

            describe("addEdge()", function() {
                it("can add edge {0,1}", function() {
                    var graph = new Digraph(4);
                    graph.addEdge(0, 1);

                    assertMany([1], graph.adjacent(0));
                    assertMany([], graph.adjacent(1));
                });
            });

            describe("adjacent()", function() {
                it("returns [] when no edges added to 0", function() {
                    var graph = new Digraph(4);

                    assertMany([], graph.adjacent(0));
                });

                it("returns [1,2] when two edges added {0,1}, {0,2} and {3,0}", function() {
                    var graph = new Digraph(4);
                    graph.addEdge(0, 1);
                    graph.addEdge(0, 2);
                    graph.addEdge(3, 0);

                    assertMany([1,2], graph.adjacent(0));
                });
            });

            describe("degree()", function() {
                it("returns 0 when no edges added to 0", function() {
                    var graph = new Digraph(4);

                    assertMany(0, graph.degree(0));
                });

                it("returns 2 when two edges added {0,1}, {0,2} and {3,0}", function() {
                    var graph = new Digraph(4);
                    graph.addEdge(0, 1);
                    graph.addEdge(0, 2);
                    graph.addEdge(3, 0);

                    assertMany(2, graph.degree(0));
                });
            });
        });
    };

    return DigraphTestRunner;
})();

var testRunner = new DigraphTestRunner();
testRunner.runTests();