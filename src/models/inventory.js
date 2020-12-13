class InventoryItem {
  static ItemPriority = Object.freeze({
    "water-sample": 2,
    "rock-sample": 3,
    "storm-shield": 1,
  });
  constructor(type, quantity, priority) {
    this.type = type;
    this.quantity = quantity;
    this.priority = priority ? priority : InventoryItem.ItemPriority[type];
  }
}

class InventoryPriorityque {
  constructor(maximumSize) {
    this.inventoryList = [];
    this.inventoryMaxSize = maximumSize;
  }

  pushInventory({ type, quantity, priority }) {
    if (this.inventoryList.length >= this.inventoryMaxSize) {
      this.dequeue();
    }
    const new_inventory = new InventoryItem(type, quantity, priority);
    this.inventoryList.push(new_inventory);

    let currentIndex = this.inventoryList.length - 1;
    let parentIndex;

    while (currentIndex > 0) {
      parentIndex = Math.floor((currentIndex - 1) / 2);
      if (
        this.inventoryList[parentIndex].priority >
        this.inventoryList[currentIndex].priority
      )
        return this;
      [this.inventoryList[parentIndex], this.inventoryList[currentIndex]] = [
        this.inventoryList[currentIndex],
        this.inventoryList[parentIndex],
      ];
      currentIndex = parentIndex;
    }
    return this;
  }

  dequeue() {
    let minPriority = this.inventoryList[0];
    let parent = this.inventoryList.pop();
    let length = this.inventoryList.length;
    if (length === 0) return minPriority;
    let parentIndex = 0;
    this.inventoryList[parentIndex] = parent;

    let left,
      leftIndex = 1,
      right,
      rightIndex = 2;
    let newIndex = parentIndex;
    while (leftIndex < length || rightIndex < length) {
      left = this.inventoryList[leftIndex];
      right = this.inventoryList[rightIndex];
      parent = this.inventoryList[parentIndex];

      if (left && left.priority > parent.priority) {
        newIndex = leftIndex;
      }
      if (
        right &&
        right.priority > left.priority &&
        right.priority > parent.priority
      ) {
        newIndex = rightIndex;
      }

      if (newIndex === parentIndex) break;
      [this.inventoryList[newIndex], this.inventoryList[parentIndex]] = [
        this.inventoryList[parentIndex],
        this.inventoryList[newIndex],
      ];
      parentIndex = newIndex;

      leftIndex = 2 * parentIndex + 1;
      rightIndex = 2 * parentIndex + 2;
    }
    return minPriority || false;
  }

  reduceCount(type, count) {
    let inventory = this.inventoryList.find((inv) => inv.type === type);
    if (!inventory) {
      return false;
    }
    if (inventory.quantity - count < 0) {
      return false;
    }
    inventory.quantity -= count;
    return true;
  }
}

class Inventory {
  constructor(maximumSize) {
    this.inventoryList = [];
    this.maximumSize = maximumSize;
  }

  pushInventory({ type, quantity, priority }) {
    if (this.inventoryList.length >= this.maximumSize) {
      this.popInventory();
    }
    let new_inventory = new InventoryItem(type, quantity, priority);
    let insert_idx = 0;
    for (let index = 0; index < this.inventoryList.length; index++) {
      const inv = this.inventoryList[index];
      if (new_inventory.priority > inv.priority) {
        insert_idx++;
      } else {
        break;
      }
    }
    this.inventoryList.splice(insert_idx, 0, new_inventory);
  }

  popInventory() {
    this.inventoryList.pop();
  }

  reduceCount(type, count) {
    let inventory_idx = this.inventoryList.findIndex((inv) => inv.type == type);
    if (inventory_idx < 0) {
      return false;
    }
    let inventory = this.inventoryList[inventory_idx];
    if (inventory.quantity - count < 0) {
      return false;
    }
    inventory.quantity -= count;
    if (inventory.quantity === 0) {
      this.inventoryList.splice(inventory_idx, 1);
    }
    return true;
  }
}

module.exports = Inventory;
