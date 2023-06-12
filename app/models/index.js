const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ingredient = require("./location.model.js")(sequelize, Sequelize);
db.recipe = require("./itineraries.model.js")(sequelize, Sequelize);
db.destinations = require("./destinations.model.js")(sequelize, Sequelize);
db.itern_location = require("./itern_location.model.js")(sequelize, Sequelize);
db.itern_hotel = require("./itern_hotel.model.js")(sequelize, Sequelize);
db.hotels = require("./hotels.model.js")(sequelize, Sequelize);
db.recipeIngredient = require("./recipeIngredient.model.js")(sequelize,Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);


// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for recipe
db.user.hasMany(
  db.recipe,
  { as: "recipe" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.recipe.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);

// db.recipe.hasMany(
//   db.itern_location,
//   { as: "itern_location" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.itern_location.belongsTo(
//   db.recipe,
//   { as: "recipe" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );

db.recipe.hasMany(
  db.recipeIngredient,
  { as: "recipeIngredient" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.recipeIngredient.belongsTo(
  db.recipe,
  { as: "recipe" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.ingredient.hasMany(
  db.recipeIngredient,
  { as: "recipeIngredient" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.recipeIngredient.belongsTo(
  db.ingredient,
  { as: "ingredient" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.recipe.hasMany(
  db.itern_hotel,
  { as: "itern_hotel" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.itern_hotel.belongsTo(
  db.recipe,
  { as: "recipe" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.hotels.hasMany(
  db.itern_hotel,
  { as: "itern_hotel" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.itern_hotel.belongsTo(
  db.hotels,
  { as: "hotels" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


module.exports = db;
