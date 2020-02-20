const {
    getUser,
    authorization,
} = require('./user.controller');
const router = require("express").Router();
const verifyInfo = require('../verifyInfo');

router.get('/user/getUser', getUser);

router.post('/user/authorization', authorization);

module.exports = router;