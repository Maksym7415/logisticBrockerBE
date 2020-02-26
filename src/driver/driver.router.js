const multer = require('multer');
const express = require('express');
const path = require('path');
const uuidv1 = require('uuid/v1');

const {
    getDriver,
    changeDriverStatus,
    addPhoto,
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


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/../../../uploads`);
  },
  filename(req, file, cb) {
    const name = uuidv1();
    cb(null, `${name}.jpg`);
  },
});
router.use('/', express.static(path.join(__dirname, '../../../uploads')));
const upload = multer({ storage });
router.post('/upload', upload.array('file', 5), addPhoto);

router.put('/driver/changeDriverGeocoords', changeDriverGeocoords);

module.exports = router;
