const yup = require("yup");

const ScenarioSchema = require("./scenarioSchema");
const StateSchema = require("./stateSchema");
const InventoryItemSchema = require("./inventoryItemSchema");

const DirectionSchema = yup.object().shape({
  direction: yup.string().required().oneOf(["left", "right", "up", "down"]),
});

const RoverSchema = yup.object().shape({
  scenarios: yup.array().of(ScenarioSchema).required(),
  states: yup.array().of(StateSchema).required(),
  "deploy-point": yup.object().shape({
    row: yup.number().required(),
    column: yup.number().required(),
  }),
  "initial-battery": yup.number().max(11).required(),
  inventory: yup.array().of(InventoryItemSchema).required(),
  inventorySize: yup.number().default(10),
});

module.exports = { RoverSchema, DirectionSchema };
