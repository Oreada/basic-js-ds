const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  nodes = {};
  rootRef = null;

  root() {
    return this.rootRef || null;
  }

  add(data) {
    if (!this.has(data)) {

      let leaf = this.findLeaf(data);

      this.nodes[data] = {
        data: data,
        left: null,
        right: null,
      };
      if (leaf) {
        if (data < leaf.data) {
          leaf.left = this.nodes[data];
        } else if (data > leaf.data) {
          leaf.right = this.nodes[data];
        }
      } else {
        this.rootRef = this.nodes[data];
      };
    };
  }



  has(data) {
    return (data in this.nodes);
  }

  find(data) {
    if (this.has(data)) {
      return this.nodes[data];
    }
    else {
      return null;
    }
  }

  remove(data) {
    if (this.has(data)) {
      let node = this.find(data);
      let parent = this.findParent(data);
      if (parent) {
        if (data < parent.data && parent.left.data == data) {
          parent.left = null;
        }
        if (data > parent.data && parent.right.data == data) {
          parent.right = null;
        }
      } else {
        if (node.left) {
          this.rootRef = node.left;
          node.left = null;
        } else {
          this.rootRef = node.right;
          node.right = null;
        }
      }

      if (node.left) {
        let leaf = this.findLeaf(node.left.data);
        if (node.left.data < leaf.data) {
          leaf.left = node.left;
        } else {
          leaf.right = node.left;
        }
      }

      if (node.right) {
        let leaf = this.findLeaf(node.right.data);
        if (node.right.data < leaf.data) {
          leaf.left = node.right;
        } else {
          leaf.right = node.right;
        }
      }

      delete this.nodes[data];
    }
  }

  min() {
    let node = this.root();
    if (node) {
      while (true) {
        if (node.left == null) {
          return node.data;
        }
        node = node.left;
      }
    }
    return null;
  }

  max() {
    let node = this.root();
    if (node) {
      while (true) {
        if (node.right == null) {
          return node.data;
        }
        node = node.right;
      }
    }
    return null;
  }

  findLeaf(data, node = null) {
    if (!node) {
      node = this.root();
      if (!node) {
        return null;
      };
    };

    if (data < node.data) {
      if (node.left) {
        return this.findLeaf(data, node.left);
      } else {
        return node;
      };
    } else if (data > node.data) {
      if (node.right) {
        return this.findLeaf(data, node.right);
      } else {
        return node;
      };
    };
    return node;
  }

  findParent(data, node = null) {
    if (!node) {
      node = this.root();
      if (!node) {
        return null;
      };
    };

    if (data < node.data) {
      if (node.left) {
        if (node.left.data == data) {
          return node;
        } else {
          return this.findLeaf(data, node.left);
        }
      } else {
        return null;
      };
    } else if (data > node.data) {
      if (node.right) {
        if (node.right.data == data) {
          return node;
        } else {
          return this.findLeaf(data, node.right);
        }
      } else {
        return null;
      };
    };
    return node;
  }
}

module.exports = {
  BinarySearchTree
};