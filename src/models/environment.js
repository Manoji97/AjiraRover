class Environment {
  static ENVIRONMENT = null;
  static FIELDNAMES = Object.freeze({
    temperature: "temperature",
    humidity: "humidity",
    "solar-flare": "solarFlare",
    storm: "storm",
  });

  constructor(temperature, humidity, solarFlare, storm, areamap) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.solarFlare = solarFlare;
    this.storm = storm;
    this.areaMap = areamap;
    Environment.ENVIRONMENT = this;
  }

  updateFields = (fieldsObject) => {
    for (const field in fieldsObject) {
      if (Environment.FIELDNAMES.hasOwnProperty(field)) {
        this[Environment.FIELDNAMES[field]] = fieldsObject[field];
      }
    }
  };

  getTerainType = (location) => {
    return this.areaMap[location.row][location.column];
  };

  getStatus = (location) => {
    return {
      temperature: this.temperature,
      humidity: this.humidity,
      "solar-flare": this.solarFlare,
      storm: this.storm,
      terrain: this.getTerainType(location),
    };
  };

  getEnvDetails = (currentPosition, direction) => {
    let nextLocation = {};
    switch (direction) {
      case "up":
        nextLocation.row = currentPosition.row - 1;
        nextLocation.column = currentPosition.column;
        break;
      case "down":
        nextLocation.row = currentPosition.row + 1;
        nextLocation.column = currentPosition.column;
        break;
      case "left":
        nextLocation.row = currentPosition.row;
        nextLocation.column = currentPosition.column - 1;
        break;
      case "right":
        nextLocation.row = currentPosition.row;
        nextLocation.column = currentPosition.column + 1;
        break;
      default:
        break;
    }
    if (
      nextLocation.row < 0 ||
      nextLocation.row >= this.areaMap.length ||
      nextLocation.column < 0 ||
      nextLocation.column >= this.areaMap[0].length
    ) {
      const error = new Error("Can move only within mapped area!");
      error.statusCode = 428;
      throw error;
    }

    return {
      nextLocation,
      terrain: this.getTerainType(nextLocation),
      solarFlare: this.solarFlare,
      storm: this.storm,
      temperature: this.temperature,
      humidity: this.humidity,
    };
  };
}

module.exports = Environment;
