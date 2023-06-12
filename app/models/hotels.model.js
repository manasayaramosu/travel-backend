module.exports = (sequelize, Sequelize) => {
  const Hotel = sequelize.define("Hotels", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  return Hotel;
};
