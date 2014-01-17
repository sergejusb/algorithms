var TreeNode = (function() {
    function TreeNode(key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
    }

    return TreeNode;
})();

var BinarySearchTree = (function() {
    function BinarySearchTree() {
        this.root = null;
    }

    BinarySearchTree.prototype.search = function(key) {
        var node = this.root;
        while (node !== null) {
            if (key < node.key) {
                node = node.left;
            }
            else if (key > node.key) {
                node = node.right;
            }
            else {
                return node.value;
            }
        }

        return null;
    };

    BinarySearchTree.prototype.insert = function(key, value, node) {
        if (node === undefined) {
            this.root = this.insert(key, value, this.root);
            return;
        }
        
        if (node === null) {
            return new TreeNode(key, value);
        }
        
        if (key < node.key) {
            node.left = this.insert(key, value, node.left);
        }
        else if (key > node.key) {
            node.right = this.insert(key, value, node.right);
        }
        else {
            node.value = value;
        }

        return node;
    };

    BinarySearchTree.prototype.delete = function(key, node) {
        if (node === undefined) {
            this.root = this.delete(key, this.root);
            return;
        }

        if (node === null) {
            return null;
        }

        if (key < node.key) {
            node.left = this.delete(key, node.left);
        }
        else if (key > node.key) {
            node.right = this.delete(key, node.right);
        }
        else {
            if (node.left === null) {
                return node.right;
            }
            else if (node.right === null) {
                return node.left;
            }
            else {
                var tmp = node;
                node = this.min(node.right);
                node.right = this.deleteMin(tmp.right);
                node.left = tmp.left;
            }
        }

        return node;
    };

    BinarySearchTree.prototype.min = function(current) {
        if (current === undefined) {
            current = this.root;
        }

        if (current === null) {
            return null;
        }

        while (current.left !== null) {
            current = current.left;
        }

        return current;
    };

    BinarySearchTree.prototype.deleteMin = function(current) {
        if (current === undefined) {
            this.root = this.deleteMin(this.root);
        }

        if (current === null) {
            return null;
        }

        if (current.left === null) {
            return current.right;
        }

        current.left = this.deleteMin(current.left);

        return current;
    };

    BinarySearchTree.prototype.range = function(min, max, current, nodes) {
        if (current === undefined && nodes === undefined) {
            return this.range(min, max, this.root, []);
        }

        if (current === null) {
            return;
        }

        if (current.key > min) {
            this.range(min, max, current.left, nodes);
        }

        if (min <= current.key && current.key <= max) {
            nodes.push(current.key);
        }

        if (current.key < max) {
            this.range(min, max, current.right, nodes);
        }

        return nodes;
    };

    BinarySearchTree.prototype.traversePreOrder = function(nodes, current) {
        if (nodes === undefined && current === undefined) {
            return this.traversePreOrder([], this.root);
        }

        if (current !== null) {
            nodes.push(current.value);
            this.traversePreOrder(nodes, current.left);
            this.traversePreOrder(nodes, current.right);
        }

        return nodes;
    };

    BinarySearchTree.prototype.traverseInOrder = function(nodes, current) {
        if (nodes === undefined && current === undefined) {
            return this.traverseInOrder([], this.root);
        }

        if (current !== null) {
            this.traverseInOrder(nodes, current.left);
            nodes.push(current.value);
            this.traverseInOrder(nodes, current.right);
        }

        return nodes;
    };

    BinarySearchTree.prototype.traversePostOrder = function(nodes, current) {
        if (nodes === undefined && current === undefined) {
            return this.traversePostOrder([], this.root);
        }

        if (current !== null) {
            this.traversePostOrder(nodes, current.left);
            this.traversePostOrder(nodes, current.right);
            nodes.push(current.value);
        }

        return nodes;
    };

    BinarySearchTree.prototype.traverseLevelOrder = function() {
        var nodes = [];
        var queue = [this.root];

        while (queue.length > 0) {
            var current = queue.shift();
            if (current !== null) {
                nodes.push(current.value);
            }
            if (current.left !== null) {
                queue.push(current.left);
            }
            if (current.right !== null) {
                queue.push(current.right);
            }
        }

        return nodes;
    };

    return BinarySearchTree;
})();

module.exports = TreeNode;
module.exports = BinarySearchTree;