const Sequelize = require('sequelize');
const seq = require('../database/dbmysql');
const driverTable = require('./driver');
const vehicleTable = require('./vehicle');


driverVehicleTable = seq.define('driver_vehicle', {
    id_driver_vehicle: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    fk_driver:{
        type: Sequelize.INTEGER(11),
        allowNull:false,
    },
    fk_vehicle:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
    }
});

module.exports = driverVehicleTable;