const {
    getOrders,
    getOrderInfo,
    getDrivers,
    getStakes,
    getDriver,
    getProfile,
    placeBid
} = require('./manager.controller');
const seq = require('../database/dbmysql');
const jwt = require('jsonwebtoken');
const router = require("express").Router();
const createError = require('http-errors');


router.use('/manager', async (req, res, next) => {
    if (req.token) {
        const token = await seq.models.user.findOne({
            where: {
                token: req.token
            }
        });
        if (token) {
            jwt.verify(req.token, 'secretKey', (err, decoded) => {
                if (err) next(createError(400, err.message, {stack:err}));
            });
            if (token.role == 'manager' || token.role == 'admin') {
                next();
            } else {
                next(createError(400, 'For managers and admins only'));
            }
        } else {
            next(createError(400, 'Invalid token'));
        }
    } else {
        next(createError(400, 'No token in headers'));
    }
});

router.get('/manager/getOrders', getOrders);

router.post('/manager/getOrderInfo', getOrderInfo);

router.get('/manager/getDrivers', getDrivers);

router.get('/manager/getStakes', getStakes);

router.post('/manager/getDriver', getDriver);

router.post('/manager/getProfile', getProfile);

router.post('/manager/placeBid', placeBid);

module.exports = router;