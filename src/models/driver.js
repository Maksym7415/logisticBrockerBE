const Sequelize = require('sequelize');
const seq = require('../database/dbmysql');
const userTable = require('./user');
const stakeTable = require('../models/stake');
const driverVehicleTable = require('./driver_vehicle');

driverTable = seq.define('driver', {
    id_driver: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    status:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    phone:{
        type: Sequelize.STRING(15),
        allowNull:false
    },
});

driverTable.belongsTo(userTable, { foreignKey: {name:'fk_user', allowNull:false}, foreignKeyConstraint: true });
driverTable.hasMany(stakeTable, { foreignKey: {name:'fk_driver', allowNull:false}, foreignKeyConstraint: true });
driverTable.hasMany(driverVehicleTable, { foreignKey: {name:'fk_driver', allowNull:false}, foreignKeyConstraint: true });

module.exports = driverTable;