var Graph = (function() {
    function Graph(vertices) {
        this.adjacency = [];
        for (var i = 0; i < vertices; i++) {
            this.adjacency.push([]);
        }
    }

    Graph.prototype.vertices = function() {
        return this.adjacency.length;
    };

    Graph.prototype.addEdge = function(from, to) {
        putVertex(this.adjacency[from], to);
        putVertex(this.adjacency[to], from);
    };

    Graph.prototype.adjacent = function(vertex) {
        return this.adjacency[vertex];
    };

    Graph.prototype.degree = function(vertex) {
        return this.adjacency[vertex].length;
    };

    function putVertex(adjacent, vertex) {
        for (var i = 0; i < adjacent.length; i++) {
            if (adjacent[i] === vertex) return;
        }

        adjacent.push(vertex);
    }

    return Graph;
})();

module.exports = Graph;