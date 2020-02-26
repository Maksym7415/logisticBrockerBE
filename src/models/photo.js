const Sequelize = require('sequelize');
const seq = require('../database/dbmysql');
const orderTable = require('./order');

photoTable = seq.define('photo', {
    id: {
        type: Sequelize.STRING(100),
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
});

photoTable.belongsTo(orderTable, { foreignKey: {name:'order_id', allowNull:false}, foreignKeyConstraint: true });
orderTable.hasMany(photoTable, { foreignKey: {name:'order_id', allowNull:false}, foreignKeyConstraint: true });

module.exports = photoTable;