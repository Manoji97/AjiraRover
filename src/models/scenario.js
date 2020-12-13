class ScenarioCondition {
  constructor({ type, property, operator, value }) {
    this.type = type;
    this.property = property;
    this.operator = operator;
    this.value = value;
  }

  getValidity = (sceneValue) => {
    switch (this.operator) {
      case "eq":
        return this.value === sceneValue;
      case "ne":
        return this.value != sceneValue;
      case "lte":
        return sceneValue <= this.value;
      case "gte":
        return sceneValue >= this.value;
      case "lt":
        return this.value < sceneValue;
      case "gt":
        return this.value > sceneValue;
      default:
        return false;
    }
  };
}

class Scenario {
  constructor({ name, conditions, rover }) {
    this.name = name;
    this.conditions = conditions.map(
      (condition) => new ScenarioCondition(condition)
    );
    this.rover = rover;
  }
}

module.exports = Scenario;
