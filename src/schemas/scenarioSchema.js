const yup = require("yup");

const ScenarioConditionSchema = yup.object().shape({
  type: yup.string().oneOf(["rover", "environment"]).required(),

  property: yup.string().when("type", {
    is: "rover",
    then: yup.string().oneOf(["battery"]).required(),
    otherwise: yup
      .string()
      .oneOf(["terrain", "temperature", "humidity", "solar-flare", "storm"])
      .required(),
  }),

  operator: yup
    .string()
    .oneOf(["eq", "ne", "lte", "gte", "lt", "gt"])
    .required(),

  value: yup.mixed(),
});

const performSchema = yup.object().shape({
  name: yup.string(),
  type: yup.string(),
  qty: yup.number(),
  batteryConsumption: yup.number().default(0),
});

const ScenarioRoverSchema = yup.object().shape({
  is: yup.string().default(null).nullable(),

  performs: yup.array().of(performSchema).default(null).nullable(),
  /*
  performs: yup
    .object()
    .shape({
      "collect-sample": yup
        .object()
        .shape({
          type: yup.string(),
          qty: yup.number(),
          batteryConsumption: yup.number().default(0),
        })
        .default(null)
        .nullable(),
      "item-usage": yup
        .object()
        .shape({
          type: yup.string(),
          qty: yup.number(),
          batteryConsumption: yup.number().default(0),
        })
        .default(null)
        .nullable(),
    })
    .default(null)
    .nullable(),
    */
});

const ScenarioSchema = yup.object().shape({
  name: yup.string().required(),
  conditions: yup.array().of(ScenarioConditionSchema).required(),
  rover: ScenarioRoverSchema.required(),
});

module.exports = ScenarioSchema;
