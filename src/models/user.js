const Sequelize = require('sequelize');
const seq = require('../database/dbmysql');

module.exports = seq.define('user', {
    user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    login: {
        unique: true,
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    role:{
        type: Sequelize.STRING(10),
        allowNull: false,
    }
})