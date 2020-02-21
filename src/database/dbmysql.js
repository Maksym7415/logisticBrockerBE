const mysql = require('mysql2');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: "mysql",
    host: process.env.DB_HOST,
    omitNull: true,
    define:{
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
    }
  });

module.exports = sequelize;