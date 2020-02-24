const {
    getUser,
    authorization,
    addUser
} = require('./user.controller');
const router = require("express").Router();
const verifyInfo = require('../verifyInfo');

router.get('/user/getUser', getUser);

router.post('/user/authorization', authorization);

router.post('/user/addUser', addUser);

module.exports = router;