const Sequelize = require('sequelize');
const seq = require('../database/dbmysql');
const userTable = require('./user');
const vehicleTable = require('./vehicle');
const orderTable = require('./order');
const stakeTable = require('./stake');


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
        type: Sequelize.ENUM('Available', 'Not Available'),
        allowNull: false,
        defaultValue: 'Not Available',
    },
    phone:{
        type: Sequelize.STRING(15),
        allowNull:false
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

driverTable.belongsTo(userTable, { foreignKey: {name:'fk_user', allowNull:false}, foreignKeyConstraint: true });

driverTable.belongsTo(vehicleTable, { foreignKey: {name:'fk_vehicle', allowNull:false}, foreignKeyConstraint: true });

driverTable.belongsToMany(orderTable,{through:'stake', as: 'orders', foreignKey:'fk_driver', otherKey:'fk_order'});
orderTable.belongsToMany(driverTable,{through:'stake', as: 'drivers', foreignKey:'fk_order', otherKey:'fk_driver'});

module.exports = driverTable;