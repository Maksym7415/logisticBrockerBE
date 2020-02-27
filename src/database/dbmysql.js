const mysql = require('mysql2');
const Sequelize = require('sequelize');

const sequelize = new Sequelize("maks", "maks", "QfAekkCnfrtH", {
    dialect: "mysql",
    host: "localhost",
    omitNull: true,
    define:{
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
    }
});

module.exports = sequelize;
