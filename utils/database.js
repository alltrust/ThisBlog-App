const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("blog-schema", "root", "aldo1994", {
    host: "localhost",
    dialect: "mysql"
})

module.exports = sequelize 