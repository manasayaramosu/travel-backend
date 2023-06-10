const db = require("../models");
const Ingredient = db.ingredient;
const Op = db.Sequelize.Op;

// Create and Save a new Ingredient
// Create and Save a new Ingredient
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Destinations || !req.body.placediscription || !req.body.Touristspots) {
    return res.status(400).send({
      message: "Destinations, placediscription, and Touristspots are required fields",
    });
  }

  // Create an Ingredient
  const ingredient = {
    Destinations: req.body.Destinations,
    placediscription: req.body.placediscription,
    Touristspots: req.body.Touristspots,
  };

  // Save Ingredient in the database
  Ingredient.create(ingredient)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ingredient.",
      });
    });
};


// Retrieve all Ingredients from the database.
exports.findAll = (req, res) => {
  const ingredientId = req.query.ingredientId;
  var condition = ingredientId
    ? {
        id: {
          [Op.like]: `%${ingredientId}%`,
        },
      }
    : null;

  Ingredient.findAll({ where: condition, order: [["Destinations", "ASC"]] })
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

// Find a single Ingredient with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Ingredient.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Ingredient with id=" + id,
      });
    });
};

// Update a Ingredient by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Ingredient.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Ingredient was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Ingredient with id=${id}. Maybe Ingredient was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Ingredient with id=" + id,
      });
    });
};

// Delete a Ingredient with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Ingredient.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Ingredient was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Ingredient with id=${id}. Maybe Ingredient was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Ingredient with id=" + id,
      });
    });
};

// Delete all Ingredients from the database.
exports.deleteAll = (req, res) => {
  Ingredient.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Ingredients were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all ingredients.",
      });
    });
};