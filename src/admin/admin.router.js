const {
    register
} = require('./admin.controller');
const seq = require('../database/dbmysql');
const jwt = require('jsonwebtoken');
const router = require("express").Router();
const createError = require('http-errors');

router.use('/admin', async (req, res, next) => {
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
            if (token.role == 'admin') {
                next();
            } else {
                next(createError(400, 'For admins only'));
            }
        } else {
            next(createError(400, 'Invalid token'));
        }
    } else {
        next(createError(400, 'No token in headers'));
    }
});

router.post('/admin/register', register);

module.exports = router;