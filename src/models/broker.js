const Sequelize = require('sequelize');
const seq = require('../database/dbmysql');
const orderTable = require('./order');

brokerTable = seq.define('broker', {
    id_broker: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    phone:{
        type: Sequelize.STRING(20),
        allowNull:false,
    },
    email:{
        type: Sequelize.STRING(45),
        allowNull:false,
    },
    fax:{
        type: Sequelize.STRING(45),
        allowNull:true,
    }
});

brokerTable.hasMany(orderTable, { foreignKey: {name:'fk_broker', allowNull:false}, foreignKeyConstraint: true });

module.exports = brokerTable;