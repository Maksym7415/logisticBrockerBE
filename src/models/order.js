const Sequelize = require('sequelize');
const seq = require('../database/dbmysql');
const stakeTable = require('../models/stake');
const managerTable = require('./manager');

orderTable = seq.define('order', {
    id_order: {
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


//managerTable.belongsToMany(orderTable,{through:'stake', as: 'orders', foreignKey:'fk_manager', otherKey:'fk_order'});
//orderTable.belongsToMany(managerTable,{through:'stake', as: 'managers', foreignKey:'fk_order', otherKey:'fk_manager'});

orderTable.hasMany(stakeTable, { foreignKey: {name:'fk_order', allowNull:false}, foreignKeyConstraint: true });

module.exports = orderTable;