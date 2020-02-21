const {
    getOrders,
    getOrderInfo,
    getDrivers,
    getStakes
} = require('./manager.controller');
const router = require("express").Router();
//const verifyInfo = require('../verifyInfo');

router.get('/manager/getOrders', getOrders);

router.post('/manager/getOrderInfo', getOrderInfo);

router.get('/manager/getDrivers', getDrivers);

router.get('/manager/getStakes', getStakes);

module.exports = router;