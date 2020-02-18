const Sequelize = require('sequelize');
const seq = require('../database/dbmysql');
const userTable = require('./user');

tokenTable = seq.define('token', {
    token_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    token: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
})

tokenTable.belongsTo(userTable, { foreignKey: 'fk_user', foreignKeyConstraint: true });

module.exports = tokenTable;

