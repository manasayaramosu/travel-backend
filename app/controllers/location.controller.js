const db = require("../models");
const Location = db.ingredient;
const Op = db.Sequelize.Op;

// Create and Save a new Location
// Create and Save a new Location
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Destinations || !req.body.placediscription || !req.body.Touristspots) {
    return res.status(400).send({
      message: "Itineraries, placediscription, and Touristspots are required fields",
    });
  }

  // Create an Location
  const ingredient = {
    Destinations: req.body.Destinations,
    placediscription: req.body.placediscription,
    Touristspots: req.body.Touristspots,
  };

  // Save Location in the database
  Location.create(ingredient)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Location.",
      });
    });
};


// Retrieve all Locations from the database.
exports.findAll = (req, res) => {
  Location.findAll(
    { 
      order: [
        ["Touristspots", "ASC"]
      ], 
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ingredients.",
      });
    });
};

exports.findAllByDestination = (req, res) => {
  const ingredientId = req.query.ingredientId;
  var condition = ingredientId
    ? {
        id: {
          [Op.like]: `%${ingredientId}%`,
        },
      }
    : null;

  Location.findAll({ where: condition, order: [["Itineraries", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ingredients.",
      });
    });
};


// Find a single Location with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Location.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Location with id=" + id,
      });
    });
};

// Update a Location by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Location.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Location was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Location with id=${id}. Maybe Location was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Location with id=" + id,
      });
    });
};

// Delete a Location with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Location.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Location was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Location with id=${id}. Maybe Location was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Location with id=" + id,
      });
    });
};

// Delete all Locations from the database.
exports.deleteAll = (req, res) => {
  Location.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Locations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all ingredients.",
      });
    });
};