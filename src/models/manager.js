const Sequelize = require('sequelize');
const seq = require('../database/dbmysql');
const userTable = require('./user');
const stakeTable = require('./stake');

managerTable = seq.define('manager', {
    id: {
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

managerTable.belongsTo(userTable, { foreignKey: {name:'user_id', allowNull:false}, foreignKeyConstraint: true });
managerTable.hasMany(stakeTable, { foreignKey: {name:'manager_id', allowNull:false}, foreignKeyConstraint: true });
stakeTable.belongsTo(managerTable, { foreignKey: {name:'manager_id', allowNull:false}, foreignKeyConstraint: true });

module.exports = managerTable;