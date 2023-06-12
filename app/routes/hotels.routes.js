module.exports = (app) => {
  const Recipe = require("../controllers/hotels.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Create a new Recipe
  router.post("/hotels/", [authenticateRoute], Recipe.create);

  // Retrieve all Recipes for user
  router.get(
    "/hotels/user/:userId",
    [authenticateRoute],
    Recipe.findAllForUser
  );
  // Retrieve all published Recipes
  router.get("/hotels/", Recipe.findAllPublished);
  // Update a Recipe with id
  router.put("/hotels/:id", [authenticateRoute], Recipe.update);

  // Retrieve a single Recipe with id 
  router.get("/hotels/:id", Recipe.findOne);

  // Delete a Recipe with id
  router.delete("/hotels/:id", [authenticateRoute], Recipe.delete);

  // Delete all Recipes
  router.delete("/hotels/", [authenticateRoute], Recipe.deleteAll);

  app.use("/travelapi", router);
};
