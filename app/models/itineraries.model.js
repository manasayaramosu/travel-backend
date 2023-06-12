module.exports = (sequelize, Sequelize) => {
  const Itinerarie = sequelize.define("Itineraries", {
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
    enddate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
  return Itinerarie;
};
