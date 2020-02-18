const {
    getOrders,
    setOrders,
    filterOrders,
    sendEmail
} = require('./admin.controller');
const router = require("express").Router();
const verifyInfo = require('../users/verifyInfo');

router.get('/getOrders', verifyInfo, getOrders);

router.post('/setOrders', verifyInfo, setOrders);

router.post('/filterOrders', verifyInfo, filterOrders);

router.post('/sendEmail', sendEmail);

module.exports = router;