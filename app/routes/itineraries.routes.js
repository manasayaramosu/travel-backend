module.exports = (app) => {
  const Recipe = require("../controllers/itineraries.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Create a new Recipe
  router.post("/itineraries/", [authenticateRoute], Recipe.create);

  // Retrieve all Recipes for user
  router.get(
    "/itineraries/user/:userId",
    [authenticateRoute],
    Recipe.findAllForUser
  );
  // Retrieve all published Recipes
  router.get("/itineraries/", Recipe.findAllPublished);
  // Update a Recipe with id
  router.put("/itineraries/:id", [authenticateRoute], Recipe.update);

  // Retrieve a single Recipe with id 
  router.get("/itineraries/:id", Recipe.findOne);

  // Delete a Recipe with id
  router.delete("/itineraries/:id", [authenticateRoute], Recipe.delete);

  // Delete all Recipes
  router.delete("/itineraries/", [authenticateRoute], Recipe.deleteAll);

  app.use("/travelapi", router);
};
