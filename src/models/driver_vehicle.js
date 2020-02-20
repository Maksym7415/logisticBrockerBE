const Sequelize = require('sequelize');
const seq = require('../database/dbmysql');

driverVehicleTable = seq.define('driver_vehicle', {
    id_driver_vehicle: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
});

module.exports = driverVehicleTable;