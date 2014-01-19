var Graph = require('./graph.js');

var DepthFirstSearch = (function() {
    function DepthFirstSearch(graph, start) {
        this.start = start;
        this.visited = [];
        this.from = [];
        for (var i = 0; i < graph.vertices(); i++) {
            this.visited.push(false);
            this.from.push(null);
        }

        var toVisit = [start];
        while (toVisit.length > 0) {
            var vertex = toVisit.pop();
            this.visited[vertex] = true;

            var adjacent = graph.adjacent(vertex);
            for (var i = 0; i < adjacent.length; i++) {
                if (this.visited[adjacent[i]] !== true) {
                    this.from[adjacent[i]] = vertex;
                    toVisit.push(adjacent[i]);
                }
            }
        }
    }

    DepthFirstSearch.prototype.hasPathTo = function(vertex) {
        return this.visited[vertex] === true;
    };

    DepthFirstSearch.prototype.pathTo = function(vertex) {
        if (!this.hasPathTo(vertex)) return null;

        var path = [];
        for (var v = vertex; v !== this.start; v = this.from[v]) {
            path.push(v);
        }
        path.push(this.start);

        return path;
    };

    return DepthFirstSearch;
})();

module.exports = DepthFirstSearch;