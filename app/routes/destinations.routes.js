module.exports = (app) => {
  const Recipe = require("../controllers/destinations.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Create a new Recipe
  router.post("/destinations/", [authenticateRoute], Recipe.create);

  // Retrieve all Recipes for user
  router.get(
    "/destinations/user/:userId",
    [authenticateRoute],
    Recipe.findAllForUser
  );
  // Retrieve all published Recipes
  router.get("/destinations/", Recipe.findAllPublished);
  // Update a Recipe with id
  router.put("/destinations/:id", [authenticateRoute], Recipe.update);

  // Retrieve a single Recipe with id 
  router.get("/destinations/:id", Recipe.findOne);

  // Delete a Recipe with id
  router.delete("/destinations/:id", [authenticateRoute], Recipe.delete);

  // Delete all Recipes
  router.delete("/destinations/", [authenticateRoute], Recipe.deleteAll);

  app.use("/travelapi", router);
};
