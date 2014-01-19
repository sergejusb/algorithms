var Digraph = (function() {
    function Digraph(vertices) {
        this.adjacency = [];
        for (var i = 0; i < vertices; i++) {
            this.adjacency.push([]);
        }
    }

    Digraph.prototype.vertices = function() {
        return this.adjacency.length;
    };

    Digraph.prototype.addEdge = function(from, to) {
        putVertex(this.adjacency[from], to);
    };

    Digraph.prototype.adjacent = function(vertex) {
        return this.adjacency[vertex];
    };

    Digraph.prototype.degree = function(vertex) {
        return this.adjacency[vertex].length;
    };

    function putVertex(adjacent, vertex) {
        for (var i = 0; i < adjacent.length; i++) {
            if (adjacent[i] === vertex) return;
        }

        adjacent.push(vertex);
    }

    return Digraph;
})();

module.exports = Digraph;