const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Favourite = sequelize.define("favourite", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = Favourite;
