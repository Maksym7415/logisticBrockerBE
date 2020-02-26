const Sequelize = require('sequelize');
const seq = require('../database/dbmysql');

stakeTable = seq.define('stake', {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    created:{
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.fn('now'),
    },
    driver_price:{
        type: Sequelize.FLOAT(6,2),
        allowNull: false,
    },
    broker_price:{
        type: Sequelize.FLOAT(6,2),
        allowNull: false,
    },
    percent:{
        type: Sequelize.FLOAT(3,1),
        allowNull: false,
    },
    status:{
        type: Sequelize.ENUM("Accepted", "Denied", "Pending"),
        allowNull:false,
        defaultValue:"Pending",
    },
},{
    indexes:[{
        unique:true,
        fields:['order_id', 'driver_id', 'manager_id'],
    }]
}
);

module.exports = stakeTable;