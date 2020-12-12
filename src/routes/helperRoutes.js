const express = require("express");
const router = new express.Router();

const Rover = require("../models/rover");
const Environment = require("../models/environment");

router.get("environment/env", async (req, res, next) => {
  try {
    if (!Environment.ENVIRONMENT) {
      err = new Error("No Environments available!");
      err.statusCode = 404;
      throw err;
    }
    return res.status(202).send(Environment.ENVIRONMENT);
  } catch (error) {
    error.statusCode = error.statusCode || 400;
    next(error);
  }
});

router.get("rover/specs", async (req, res, next) => {
  try {
    if (!Rover.ROVER) {
      err = new Error("No Rovers available!");
      err.statusCode = 404;
      throw err;
    }
    return res.status(202).send(Rover.ROVER);
  } catch (error) {
    error.statusCode = error.statusCode || 400;
    next(error);
  }
});

module.exports = router;
