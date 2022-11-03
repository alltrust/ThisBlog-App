const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const FavBlog = sequelize.define("favBlog", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = FavBlog;
