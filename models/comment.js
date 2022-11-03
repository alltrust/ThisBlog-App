const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Comment = sequelize.define("comment", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Comment;
