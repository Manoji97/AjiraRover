const ConstStrings = {
  ROVER: "rover",
  ENVIRONMENT: "environment",
  DIRECTION: {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right",
  },
  FIELDVALUES: {
    SOLARFLARE: "solar-flare",
  },
};

const ErrorMessages = {
  OUT_OF_BOUNDRY: "Can move only within mapped area!",
  STORM_CANT_MOVE: "Cannot move during a storm!",
  ROVER_BATTERY_LOW: "Rover Cannot Move Because Battery Low!",
};

module.exports = { ConstStrings, ErrorMessages };
