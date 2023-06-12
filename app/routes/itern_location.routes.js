module.exports = (app) => {
  const Recipe = require("../controllers/iternLocation.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Create a new Recipe
  router.post("/iternLocation/", [authenticateRoute], Recipe.create);

  // Retrieve all Recipes for user
  router.get(
    "/iternLocation/user/:userId",
    [authenticateRoute],
    Recipe.findAllForUser
  );
  // Retrieve all published Recipes
  router.get("/iternLocation/", Recipe.findAllPublished);
  // Update a Recipe with id
  router.put("/iternLocation/:id", [authenticateRoute], Recipe.update);

  // Retrieve a single Recipe with id 
  router.get("/iternLocation/:id", Recipe.findOne);

  // Delete a Recipe with id
  router.delete("/iternLocation/:id", [authenticateRoute], Recipe.delete);

  // Delete all Recipes
  router.delete("/iternLocation/", [authenticateRoute], Recipe.deleteAll);

  app.use("/travelapi", router);
};
