const db = require("../models");
const date = require('date-and-time')
const Hotel = db.hotels;
const Op = db.Sequelize.Op;
// Create and Save a new Recipe
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for Hotel!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.description === undefined) {
    const error = new Error("Description cannot be empty for Hotel!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Itinerary 
  const recipe = {
    name: req.body.name,
    description: req.body.description
  };
  // Save Hotel in the Itinerary
  Hotel.create(recipe)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Hotel.",
      });
    });
};

// Find all Hotels for a user
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Hotel.findAll({
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
          message: `Cannot find Hotels for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Hotels for user with id=" + userId,
      });
    });
};

// Find all Published Hotels
exports.findAllPublished = (req, res) => {
  Hotel.findAll({
    order: [
      ["name", "ASC"]
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Published Hotels.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Published Hotels.",
      });
    });
};
// Find a single Hotel with an id

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Hotel.findAll({
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
  Hotel.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Hotel was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Hotel with id=${id}. Maybe Hotel was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Hotel with id=" + id,
      });
    });
};
// Delete a Hotel with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Hotel.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Hotel was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Hotel with id=${id}. Maybe Hotel was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Hotel with id=" + id,
      });
    });
};
// Delete all Hotels from the database.
exports.deleteAll = (req, res) => {
  Hotel.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Hotels were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all itineraries.",
      });
    });
};