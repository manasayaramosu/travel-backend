module.exports = (sequelize, Sequelize) => {
  const Destination = sequelize.define("Destinations", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  return Destination;
};
