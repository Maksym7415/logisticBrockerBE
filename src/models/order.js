const Sequelize = require('sequelize');
const seq = require('../database/dbmysql');
const stakeTable = require('../models/stake');

orderTable = seq.define('order', {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    received:{
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.fn('now'),
    },
    pickup:{
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    pickup_longitude:{
        type: Sequelize.STRING(100),
        allowNull:true,
    },
    pickup_latitude:{
        type: Sequelize.STRING(100),
        allowNull: true,
    },
    deliver:{
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    deliver_longitude:{
        type: Sequelize.STRING(100),
        allowNull:true,
    },
    deliver_latitude:{
        type: Sequelize.STRING(100),
        allowNull: true,
    },
    price:{
        type: Sequelize.FLOAT(7,2),
        allowNull:false,
    },
    air_miles:{
        type: Sequelize.INTEGER(11),
        allowNull:false,
    },
    earth_miles:{
        type: Sequelize.INTEGER(11),
        allowNull:false,
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
    pieces:{
        type: Sequelize.INTEGER(11),
        allowNull:false,
        defaultValue:1,
    }
});

orderTable.hasMany(stakeTable, { foreignKey: {name:'order_id', allowNull:false}, foreignKeyConstraint: true });
stakeTable.belongsTo(orderTable, { foreignKey: {name:'order_id', allowNull:false}, foreignKeyConstraint: true });

module.exports = orderTable;