const express = require("express");
const router = new express.Router();

const validateDTO = require("../middlewares/validateDto");

const { RoverSchema, DirectionSchema } = require("../schemas/roverSchema");

const { Scenario, Rover } = require("../models/rover");
const Environment = require("../models/environment");
const InventoryList = require("../models/inventory");

router.get("/status", async (req, res, next) => {
  try {
    //Check if Rover and Environment is already configured
    if (!Rover.ROVER) {
      err = new Error("Configure the Rover before trying to get the Status!");
      err.statusCode = 404;
      throw err;
    }
    if (!Environment.ENVIRONMENT) {
      err = new Error(
        "Configure the Environment before trying to get the Status!"
      );
      err.statusCode = 404;
      throw err;
    }

    //execute the getStatus of Environment
    //execute the same for Rover

    let rover = Rover.ROVER;
    let environment = Environment.ENVIRONMENT;

    //combine the objects and send
    let roverStatus = rover.getStatus();
    let environmentStatus = environment.getStatus(rover.location);
    res.status(200).send({
      rover: roverStatus,
      environment: environmentStatus,
    });
  } catch (error) {
    error.statusCode = error.statusCode || 400;
    next(error);
  }
});

router.post("/configure", validateDTO(RoverSchema), async (req, res, next) => {
  try {
    /*
    //create scenarios list
    if (req.body.scenarios.length > 0) {
    }*/
    //create inventory list
    let inventory = new InventoryList();
    if (req.body.inventory.length > 0) {
      for (const inventory_item of req.body.inventory) {
        inventory.pushInventory(inventory_item);
      }
    }
    //create new Rover by  passing battery and inventory list
    let rover = new Rover(req.body["initial-battery"], inventory);

    //add statesActions to rover
    if (req.body.states.length > 0) {
      rover.loadStates(req.body.states);
    }

    res.status(200).send(Rover.ROVER);
  } catch (error) {
    error.statusCode = error.statusCode || 400;
    next(error);
  }
});

router.post("/move", validateDTO(DirectionSchema), async (req, res, next) => {
  try {
    if (!Rover.ROVER) {
      err = new Error("Configure the Rover before trying to get the Status!");
      err.statusCode = 404;
      throw err;
    }
    //get the current location of Rover
    //get the details of Environment and the terrain type of next area and coordinates too
    //call move method in rover
  } catch (error) {
    error.statusCode = error.statusCode || 400;
    next(error);
  }
});

module.exports = router;
