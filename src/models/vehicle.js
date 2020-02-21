const Sequelize = require('sequelize');
const seq = require('../database/dbmysql');
const driverVehicleTable = require('./driver_vehicle');

vehicleTable = seq.define('vehicle', {
    id_vehicle: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    model: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    length:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    width:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    height:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    weight:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
});

module.exports = vehicleTable;