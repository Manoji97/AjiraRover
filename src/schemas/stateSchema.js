const yup = require("yup");

const StateSchema = yup.object().shape({
  name: yup.string().required(),
  allowedActions: yup
    .array()
    .compact((val) => !(val === "move" || val === "collect-sample"))
    .required(),
});

module.exports = StateSchema;
