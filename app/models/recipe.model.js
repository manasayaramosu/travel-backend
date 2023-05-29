module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("recipe", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isPublished: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },

    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    startdate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    hotels: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    touristspots: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    enddate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
  return Recipe;
};
