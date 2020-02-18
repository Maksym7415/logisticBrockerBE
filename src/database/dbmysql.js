const mysql = require('mysql');
const Sequelize = require('sequelize');

const seq = new Sequelize(process.env.MYSQL_DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: "mysql",
    host: process.env.DB_HOST,
  });

module.exports = seq;