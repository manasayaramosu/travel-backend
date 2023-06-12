module.exports = (sequelize, Sequelize) => {
  const IternLocation = sequelize.define("IternLocationsold", {
    quantity: {
      type: Sequelize.FLOAT,
      allowNull: false,
    }
  });
  return IternLocation;
};
