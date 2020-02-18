const Sequelize = require('sequelize');
const seq = require('../database/dbmysql');
const userTable = require('./user');

orderTable = seq.define('order', {
    order_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    description:{
        type: Sequelize.TEXT,
        allowNull:false
    },
    status:{
        type: Sequelize.TEXT,
        allowNull:false,
        defaultValue: 'created',
    }, 
    price:{
        type: Sequelize.FLOAT(6,2),
        allowNull: false,
        defaultValue: 0
    }
});

userTable.hasMany(orderTable, { foreignKey: 'fk_user', foreignKeyConstraint: true });

module.exports = orderTable;