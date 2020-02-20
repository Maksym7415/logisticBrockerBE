const Sequelize = require('sequelize');
const seq = require('../database/dbmysql');
const userTable = require('./user');

adminTable = seq.define('admin', {
    id_admin: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
});

adminTable.belongsTo(userTable, { foreignKey: {name:'fk_user', allowNull:false}, foreignKeyConstraint: true });

module.exports = adminTable;