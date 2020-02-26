const Sequelize = require('sequelize');
const seq = require('../database/dbmysql');
const orderTable = require('./order');

photoTable = seq.define('photo', {
    id_photo: {
        type: Sequelize.STRING(100),
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
});

photoTable.belongsTo(orderTable, { foreignKey: {name:'fk_order', allowNull:false}, foreignKeyConstraint: true });
orderTable.hasMany(photoTable, { foreignKey: {name:'fk_order', allowNull:false}, foreignKeyConstraint: true });

module.exports = photoTable;