var Node = (function () {
    function Node(item, node) {
        this.item = item;
        this.next = node;
    }
    
    return Node;
})();


module.exports = Node;