const yup = require("yup");

const EnvironmentSchema = yup.object().shape({
  temperature: yup.number().required(),
  humidity: yup.number().required(),
  "solar-flare": yup.boolean().required(),
  storm: yup.boolean().required(),
  "area-map": yup.array().of(yup.array().of(yup.string())).required(),
});

const EnvironmentUpdateSchema = yup.object().shape({
  temperature: yup.number(),
  humidity: yup.number(),
  "solar-flare": yup.boolean(),
  storm: yup.boolean(),
});

module.exports = { EnvironmentSchema, EnvironmentUpdateSchema };
