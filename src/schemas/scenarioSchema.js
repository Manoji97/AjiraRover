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

const ScenarioRoverSchema = yup.object().shape({
  is: yup.string().notRequired(),

  performs: yup
    .object()
    .shape({
      "collect-sample": yup
        .object()
        .shape({
          type: yup.string(),
          qty: yup.number(),
        })
        .notRequired(),
      "item-usage": yup
        .object()
        .shape({
          type: yup.string(),
          qty: yup.number(),
        })
        .notRequired(),
    })
    .optional(),
});

const ScenarioSchema = yup.object().shape({
  name: yup.string().required(),
  conditions: yup.array().of(ScenarioConditionSchema).required(),
  rover: yup.array().of(ScenarioRoverSchema).required(),
});

module.exports = ScenarioSchema;
