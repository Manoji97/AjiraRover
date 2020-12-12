const yup = require("yup");

const InventoryItemSchema = yup.object().shape({
  type: yup
    .string()
    .oneOf(["storm-shield", "water-sample", "rock-sample"])
    .required(),
  quantity: yup.number().required(),
  priority: yup.number().required(),
});

module.exports = InventoryItemSchema;
