module.exports = (sequelize, Sequelize) => {
  const RecipeIngredient = sequelize.define("IternLocations", {
    quantity: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  });
  return RecipeIngredient;
};
