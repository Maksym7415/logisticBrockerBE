const {
    authorization
} = require('./user.controller');
const router = require("express").Router();

router.post('/user/authorization', authorization);

module.exports = router;