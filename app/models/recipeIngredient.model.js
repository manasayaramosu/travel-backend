module.exports = (sequelize, Sequelize) => {
  const RecipeIngredient = sequelize.define("Hotels", {
    quantity: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  });
  return RecipeIngredient;
};
