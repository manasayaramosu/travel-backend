module.exports = (sequelize, Sequelize) => {
  const Ingredient = sequelize.define("ingredient", {
    Destinations: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Touristspots: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Hotels: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Ingredient;
};
