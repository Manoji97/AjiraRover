const { ConstStrings, ErrorMessages } = require("../constants/constants");
const ThrowError = require("../helpers/error");

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
      this.stateActions[state.name] = state.allowedActions;
    }
  };

  performAction = ({ name, type, qty, batteryConsumption }) => {
    if (batteryConsumption > this.battery) return false;
    let result = false;
    if (name === "item-usage") {
      result = this.inventory.reduceCount(type, qty);
    } else if (name === "collect-sample") {
      result = this.inventory.pushInventory({ type: type, quantity: qty });
    }

    this.battery = Math.max(0, this.battery - batteryConsumption);
    return result;
  };

  checkScenarios = (envDetails) => {
    for (const scenario of this.scenarios) {
      let conditionValidity = scenario.conditions.length > 0 ? true : false;
      for (const condition of scenario.conditions) {
        if (condition.type === ConstStrings.ROVER) {
          conditionValidity &= condition.getValidity(this[condition.property]);
        } else if (condition.type === ConstStrings.ENVIRONMENT) {
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
          for (const to_perform of scenario.rover.performs) {
            return this.performAction(to_perform);
          }
        }
      }
      /*
      if (to_perform === "item-usage") {
        return this.performAction(
          "REMOVE_FROM_INVRNTORY",
          scenario.rover.performs["item-usage"]
        );
      }
      if (scenario.rover.performs["collect-sample"]) {
        return this.performAction(
          "INSERT_TO_INVENTORY",
          scenario.rover.performs["collect-sample"]
        );
      }
      */
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
      ThrowError(428, ErrorMessages.STORM_CANT_MOVE);
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
      ThrowError(400, ErrorMessages.ROVER_BATTERY_LOW);
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
