const Sequelize = require('sequelize');
const seq = require('../database/dbmysql');
const userTable = require('./user');
const stakeTable = require('./stake');

managerTable = seq.define('manager', {
    id_manager: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING(45),
        allowNull:false,
    },
});

managerTable.belongsTo(userTable, { foreignKey: {name:'fk_user', allowNull:false}, foreignKeyConstraint: true });
managerTable.hasMany(stakeTable, { foreignKey: {name:'fk_manager', allowNull:false}, foreignKeyConstraint: true });

module.exports = managerTable;