const {
    authorization,
    updateUserPassword
} = require('./user.controller');
const router = require("express").Router();

router.post('/user/authorization', authorization);


router.put('/user/updateUserPassword', updateUserPassword);

module.exports = router;