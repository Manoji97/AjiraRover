class InventoryItem {
  constructor(type, quantity, priority) {
    this.type = type;
    this.quantity = quantity;
    this.priority = priority;
  }
}

class InventoryList {
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
    this.size += 1;
    return true;
  };

  peak = () => {
    //in case of min heap look at the 1st index and return that value
  };

  pop = () => {
    //pop the min value
    //reduce the size by 1
  };
}

module.exports = InventoryList;
