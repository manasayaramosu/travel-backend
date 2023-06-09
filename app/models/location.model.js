module.exports = (sequelize, Sequelize) => {
  const Ingredient = sequelize.define("Locations", {
    Destinations: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Touristspots: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    placediscription: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Ingredient;

};