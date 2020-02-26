const {
    getDriver,
    changeDriverStatus,
    changeDriverGeocoords,
} = require('./driver.controller');
const router = require("express").Router();
const seq = require('../database/dbmysql');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

router.use('/driver', async (req, res, next) => {
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
            next();
        } else {
            next(createError(400, 'Invalid token'));
        }
    } else {
        next(createError(400, 'No token in headers'));
    }
});

router.post('/driver/getDriver', getDriver);

router.put('/driver/changeDriverStatus', changeDriverStatus);

router.put('/driver/changeDriverGeocoords', changeDriverGeocoords);

module.exports = router;