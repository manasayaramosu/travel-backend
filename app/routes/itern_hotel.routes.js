module.exports = (app) => {
  const RecipeIngredient = require("../controllers/itern_hotel.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication");

  // Create a new Recipe Ingredient for a Recipe
  router.post(
    "/itineraries/:recipeId/itern_hotel/",
    [authenticateRoute],
    RecipeIngredient.create
  );

  // Retrieve all Recipe Ingredients
  router.get("/itern_hotel/", RecipeIngredient.findAll);

  // Retrieve all Recipe Ingredients for a Recipe
  router.get(
    "/itineraries/:recipeId/itern_hotel/",
    RecipeIngredient.findAllForRecipe
  );

  // Retrieve all Recipe Ingredients for a Recipe Step and include the ingredients
  router.get(
    "/itineraries/:recipeId/recipeSteps/:recipeStepId/itern_hotelWithIngredients/",
    RecipeIngredient.findAllForRecipeStepWithIngredients
  );

  // Retrieve a single Recipe Ingredient with id
  router.get(
    "/itineraries/:recipeId/itern_hotel/:id",
    RecipeIngredient.findOne
  );

  // Update a Recipe Ingredient with id
  router.put(
    "/itineraries/:recipeId/itern_hotel/:id",
    [authenticateRoute],
    RecipeIngredient.update
  );

  // Delete a Recipe Ingredient with id
  router.delete(
    "/itineraries/:recipeId/itern_hotel/:id",
    [authenticateRoute],
    RecipeIngredient.delete
  );

  // Delete all Recipe Ingredients
  router.delete(
    "/itern_hotel/",
    [authenticateRoute],
    RecipeIngredient.deleteAll
  );

  app.use("/travelapi", router);
};
