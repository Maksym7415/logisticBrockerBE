const {
    getOrders,
    getOrderInfo,
    getDrivers
} = require('./manager.controller');
const router = require("express").Router();
//const verifyInfo = require('../verifyInfo');

router.get('/manager/getOrders', getOrders);

router.post('/manager/getOrderInfo', getOrderInfo);

router.get('/manager/getDrivers', getDrivers);

module.exports = router;