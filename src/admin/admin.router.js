const {
    getOrders,
    setOrders,
    filterOrders,
    sendEmail
} = require('./admin.controller');
const router = require("express").Router();
const verifyInfo = require('../verifyInfo');

router.get('/getOrders', getOrders);

router.post('/setOrders', setOrders);

router.post('/filterOrders', filterOrders);

router.post('/sendEmail', sendEmail);

module.exports = router;