const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {

  data = null;
  cursor = null;

  getUnderlyingList() {
    return this.data;
  }

  enqueue(value) {
    if (!this.data) {
      this.data = new ListNode(value);
      this.cursor = this.data;
    } else {
      this.cursor.next = new ListNode(value);
      this.cursor = this.cursor.next;
    };
  }

  dequeue() {
    let result = this.data.value;
    this.data = this.data.next;
    return result;
  }
}

module.exports = {
  Queue
};
