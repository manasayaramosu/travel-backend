module.exports = (sequelize, Sequelize) => {
  const RecipeIngredient = sequelize.define("IternHotels", {
    quantity: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  });
  return RecipeIngredient;
};
