const db = require("../models");
const date = require('date-and-time')
const Recipe = db.recipe;
const RecipeIngredient = db.recipeIngredient;
const Ingredient = db.ingredient;
const Op = db.Sequelize.Op;
// Create and Save a new Recipe
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.description === undefined) {
    const error = new Error("Description cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;}
    else if (req.body.location === undefined) {
      const error = new Error("Location cannot be empty for recipe!");
      error.statusCode = 400;
      throw error;}
    else if (req.body.startdate === undefined) {
      const error = new Error("startdate cannot be empty for recipe!");
      error.statusCode = 400;
      throw error;}      
    else if (req.body.enddate === undefined) {
      const error = new Error("enddate cannot be empty for recipe!");
      error.statusCode = 400;
      throw error;} 
    else if (req.body.isPublished === undefined) {
        const error = new Error("Is Published cannot be empty for recipe!");
        error.statusCode = 400;
        throw error;
      } 
   else if (req.body.userId === undefined) {
    const error = new Error("User Id cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Itinerary 
  const recipe = {
    name: req.body.name,
    description: req.body.description,
								
		isPublished: req.body.isPublished ? req.body.isPublished : false,			
    userId: req.body.userId,
     location: req.body.location,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    // hotels: req.body.hotels,
    // touristspots: req.body.touristspots,

  };
  // Save Recipe in the Itinerary
  Recipe.create(recipe)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Recipe.",
      });
    });
};

// Find all Recipes for a user
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Recipe.findAll({
    where: { userId: userId },
    order: [
      ["name", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Recipes for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Recipes for user with id=" + userId,
      });
    });
};

// Find all Published Recipes
exports.findAllPublished = (req, res) => {
  Recipe.findAll({
    where: { isPublished: true },
    order: [
      ["name", "ASC"]
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Published Recipes.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Published Recipes.",
      });
    });
};
// Find a single Recipe with an id

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Recipe.findAll({
      where: { id: id }
    })
      .then((data) => {
        if (data) {
          console.log("Rec");
          retuData=[];
          for (const obj of data) {  
            datVal=obj.dataValues;
            console.log(date.format(datVal.startdate,'YYYY-MM-DD'));
            datVal.startdate=date.format(datVal.startdate,'YYYY-MM-DD');
            datVal.enddate=date.format(datVal.enddate,'YYYY-MM-DD');
            retuData.push(datVal);
          }
          console.log(retuData);
          res.send(retuData);
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
  Recipe.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Recipe was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Recipe with id=${id}. Maybe Recipe was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Recipe with id=" + id,
      });
    });
};
// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Recipe.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Recipe was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Recipe with id=${id}. Maybe Recipe was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Recipe with id=" + id,
      });
    });
};
// Delete all Recipes from the database.
exports.deleteAll = (req, res) => {
  Recipe.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Recipes were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all itineraries.",
      });
    });
};