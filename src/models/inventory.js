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

class InventoryList {
  //Implements Min-Max Heap, for the O(1) retreival of Low priority Sample
  // and Storm shield
  constructor() {
    this.inventoryList = [];
    this.size = 0;
    this.maximumSize = 10; // if its filled and you want to add new item remove the less priority item
  }

  pushInventory = ({ type, quantity, priority }) => {
    if (this.size >= this.maximumSize) {
      if (this.peak.priority < priority) {
        this.pop();
      }
    }
    const inventory = new InventoryItem(type, quantity, priority);
    this.inventoryList.push(inventory);
    this.inventoryList.sort((a, b) => a.priority - b.priority);
    this.size += 1;
    return true;
  };

  peak = () => {
    //in case of min heap look at the 1st index and return that value
    return this.inventoryList[0];
  };

  popInventory = () => {
    //pop the min value
    //reduce the size by 1
    this.size -= 1;
    return this.inventoryList.pop(0);
  };
}

module.exports = InventoryList;
