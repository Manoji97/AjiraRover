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
      solarflare: this.solarFlare,
      storm: this.storm,
      terrain: getTerainType(location),
    };
  };
}

module.exports = Environment;
