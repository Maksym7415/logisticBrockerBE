const {
    getOrders,
    setOrders,
    filterOrders,
} = require('./admin.controller');
const router = require("express").Router();
const verifyInfo = require('../verifyInfo');

router.get('/getOrders', getOrders);

router.post('/setOrders', setOrders);

router.post('/filterOrders', filterOrders);

module.exports = router;