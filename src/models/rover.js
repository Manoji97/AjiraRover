class Scenario {
  constructor() {}
}

class Rover {
  static ROVER = null;
  //after creating the rover instance , move it to the deploy location
  constructor(initialBattery, initialInventory) {
    this.scenarios = {};
    this.stateActions = {};
    this.battery = initialBattery;
    this.location = {
      row: null,
      column: null,
    };
    this.inventory = initialInventory;

    this.stepCount = 0;
    Rover.ROVER = this;
  }

  getStatus = () => {
    const status = {
      location: this.location,
      battery: this.battery,
      inventory: this.inventory,
    };

    return status;
  };

  loadStates = (stateList) => {
    console.log(stateList);

    for (const state of stateList) {
      this.stateActions[state["name"]] = state.allowedActions;
      console.log(state["name"], state["allowedActions"]);
    }
  };

  move = (cordinates, terrainType) => {
    //check if battery is not low
    //check if possible to move
    //if possible update the location
    //then perform the action
    //reduce battery by 1
    //if battery is stepCount == 10, this.battery = 10
    //check for the terrainType in scenarios and perform accordingly
  };
}

module.exports = { Scenario, Rover };
