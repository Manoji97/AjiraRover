const express = require("express");
const router = new express.Router();

const validateDTO = require("../middlewares/validateDto");

const {
  EnvironmentSchema,
  EnvironmentUpdateSchema,
} = require("../schemas/environmentSchema");

const Environment = require("../models/environment");
const Rover = require("../models/rover");

router.post(
  "/configure",
  validateDTO(EnvironmentSchema),
  async (req, res, next) => {
    try {
      console.log(req.body);
      //create a new environment
      new Environment(
        req.body["temperature"],
        req.body["humidity"],
        req.body["solar-flare"],
        req.body["storm"],
        req.body["area-map"]
      );
      return res.status(200).send(Environment.ENVIRONMENT);
    } catch (error) {
      error.statusCode = error.statusCode || 400;
      next(error);
    }
  }
);

router.patch(
  "/",
  validateDTO(EnvironmentUpdateSchema),
  async (req, res, next) => {
    try {
      console.log(req.body);
      //check if Environment is already configured
      if (!Environment.ENVIRONMENT) {
        err = new Error("Create the Environment Before updating!");
        err.statusCode = 404;
        throw err;
      }
      //get the env and update
      let environment = Environment.ENVIRONMENT;
      environment.updateFields(req.body);

      if (Rover.ROVER) {
        Rover.ROVER.envUpdated({
          temperature: environment.temperature,
          humidity: environment.humidity,
          solarFlare: environment.solarFlare,
          storm: environment.storm,
        });
      }

      return res.status(200).send(environment);
    } catch (error) {
      error.statusCode = error.statusCode || 400;
      next(error);
    }
  }
);

module.exports = router;
