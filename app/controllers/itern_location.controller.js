const db = require("../models");
const date = require('date-and-time')
const IternLocation = db.itern_location;
const Op = db.Sequelize.Op;
// Create and Save a new Recipe
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for IternLocation!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.description === undefined) {
    const error = new Error("Description cannot be empty for IternLocation!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Itinerary 
  const recipe = {
    name: req.body.name,
    description: req.body.description
  };
  // Save IternLocation in the Itinerary
  IternLocation.create(recipe)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the IternLocation.",
      });
    });
};

// Find all IternLocations for a user
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  IternLocation.findAll({
    where: { userId: userId },
    order: [
      ["name", "ASC"]
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find IternLocations for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving IternLocations for user with id=" + userId,
      });
    });
};

// Find all Published IternLocations
exports.findAllPublished = (req, res) => {
  IternLocation.findAll({
    order: [
      ["name", "ASC"]
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Published IternLocations.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Published IternLocations.",
      });
    });
};
// Find a single IternLocation with an id

  exports.findOne = (req, res) => {
    const id = req.params.id;
    IternLocation.findAll({
      where: { id: id }
    })
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Recipe with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error retrieving Recipe with id=" + id,
        });
      });
  };
// Update a Recipe by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  IternLocation.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "IternLocation was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update IternLocation with id=${id}. Maybe IternLocation was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating IternLocation with id=" + id,
      });
    });
};
// Delete a IternLocation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  IternLocation.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "IternLocation was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete IternLocation with id=${id}. Maybe IternLocation was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete IternLocation with id=" + id,
      });
    });
};
// Delete all IternLocations from the database.
exports.deleteAll = (req, res) => {
  IternLocation.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} IternLocations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all itineraries.",
      });
    });
};