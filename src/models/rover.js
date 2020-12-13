const Environment = require("./environment");

class Rover {
  static ROVER = null;
  //after creating the rover instance , move it to the deploy location
  constructor(
    initialBattery,
    scenarioList,
    initialInventory,
    deployPoint,
    terrainType
  ) {
    this.scenarios = scenarioList;
    this.stateActions = {};
    this.battery = initialBattery;
    this.fullBatteryLevel = initialBattery;
    this.location = {
      row: deployPoint.row,
      column: deployPoint.column,
    };
    this.inventory = initialInventory;
    this.roverState = null;
    this.stepCount = 0;
    this.checkScenarios({ terrain: terrainType });
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
    for (const state of stateList) {
      this.stateActions[state["name"]] = state.allowedActions;
    }
  };

  checkScenarios = (envDetails) => {
    for (const scenario of this.scenarios) {
      let conditionValidity = scenario.conditions.length > 0 ? true : false;
      for (const condition of scenario.conditions) {
        if (condition.type === "rover") {
          conditionValidity &= condition.getValidity(this[condition.property]);
        } else if (condition.type === "environment") {
          if (envDetails[condition.property]) {
            conditionValidity &= condition.getValidity(
              envDetails[condition.property]
            );
          } else {
            conditionValidity = false;
          }
        }
      }
      if (conditionValidity) {
        if (scenario.rover.is) {
          this.roverState = scenario.rover.is;
        } else if (scenario.rover.performs) {
          if (scenario.rover.performs["item-usage"]) {
            let numSheilds = scenario.rover.performs["item-usage"].qty;
            let invType = scenario.rover.performs["item-usage"].type;
            let result = this.inventory.reduceCount(invType, numSheilds);
            if (!result) {
              return false;
            }
          }
          if (scenario.rover.performs["collect-sample"]) {
            let type = scenario.rover.performs["collect-sample"].type;
            let quantity = scenario.rover.performs["collect-sample"].qty;
            this.inventory.pushInventory({ type, quantity });
          }
        }
      }
    }
    return true;
  };

  envUpdated = (envDetails) => {
    let roverAlive = this.checkScenarios(envDetails); //checks battery, checks storm,
    //doesnt check terrain so doesnt collect sample
    if (!roverAlive) {
      Rover.ROVER = null;
      return;
    }

    //handle solarflare
    if (envDetails.solarFlare) {
      this.battery = this.fullBatteryLevel;
      this.stepCount = 0;
      this.roverState = null;
    }
  };

  move = (newEnvDetail) => {
    if (newEnvDetail.storm) {
      const error = new Error("Cannot move during a storm!");
      error.statusCode = 428;
      throw error;
    }

    if (this.roverState !== "immobile") {
      this.stepCount += 1;
      this.battery -= 1;
      if (this.stepCount == 10) {
        this.battery = 10;
        this.stepCount = 0;
      }
      this.location = newEnvDetail.nextLocation;
      this.checkScenarios(newEnvDetail);
    } else {
      const error = new Error();
      error.statusCode = 400;
      throw error;
    }

    //check if battery is not low
    //check if possible to move
    //if possible update the location
    //then perform the action
    //reduce battery by 1
    //if battery is stepCount == 10, this.battery = 10
    //check for the terrainType in scenarios and perform accordingly
  };
}

module.exports = Rover;
