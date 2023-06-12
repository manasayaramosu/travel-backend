const db = require("../models");
const date = require('date-and-time')
const Destination = db.destinations;
const Op = db.Sequelize.Op;
// Create and Save a new Recipe
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for Destination!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.description === undefined) {
    const error = new Error("Description cannot be empty for Destination!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Itinerary 
  const recipe = {
    name: req.body.name,
    description: req.body.description
  };
  // Save Destination in the Itinerary
  Destination.create(recipe)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Destination.",
      });
    });
};

// Find all Destinations for a user
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Destination.findAll({
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
          message: `Cannot find Destinations for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Destinations for user with id=" + userId,
      });
    });
};

// Find all Published Destinations
exports.findAllPublished = (req, res) => {
  Destination.findAll({
    order: [
      ["name", "ASC"]
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Published Destinations.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Published Destinations.",
      });
    });
};
// Find a single Destination with an id

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Destination.findAll({
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
  Destination.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Destination was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Destination with id=${id}. Maybe Destination was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Destination with id=" + id,
      });
    });
};
// Delete a Destination with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Destination.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Destination was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Destination with id=${id}. Maybe Destination was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Destination with id=" + id,
      });
    });
};
// Delete all Destinations from the database.
exports.deleteAll = (req, res) => {
  Destination.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Destinations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all itineraries.",
      });
    });
};