const Sequelize = require('sequelize');
const seq = require('../database/dbmysql');
const userTable = require('./user');
const vehicleTable = require('./vehicle');
const orderTable = require('./order');
const stakeTable = require('./stake');


driverTable = seq.define('driver', {
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
    status:{
        type: Sequelize.ENUM('Available', 'Not Available'),
        allowNull: false,
        defaultValue: 'Not Available',
    },
    price:{
        type: Sequelize.FLOAT(4,2),
        allowNull:false,
    },
    phone:{
        type: Sequelize.STRING(15),
        allowNull:false,
        unique: true,
    },
    longitude:{
        type: Sequelize.STRING(100),
        allowNull:true,
    },
    latitude:{
        type: Sequelize.STRING(100),
        allowNull: true,
    }
});

driverTable.belongsTo(userTable, { foreignKey: {name:'user_id', allowNull:false}, foreignKeyConstraint: true });
driverTable.belongsTo(vehicleTable, { foreignKey: {name:'vehicle_id', allowNull:false}, foreignKeyConstraint: true });
driverTable.hasMany(stakeTable, { foreignKey: {name:'driver_id', allowNull:false}, foreignKeyConstraint: true });
stakeTable.belongsTo(driverTable, { foreignKey: {name:'driver_id', allowNull:false}, foreignKeyConstraint: true });

module.exports = driverTable;