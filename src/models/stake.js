const Sequelize = require('sequelize');
const seq = require('../database/dbmysql');

stakeTable = seq.define('stake', {
    id_stake: {
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
        type: Sequelize.BOOLEAN,
        allowNull:true,
    }
});

module.exports = stakeTable;