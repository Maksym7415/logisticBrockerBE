const {
    getUser,
    authorization,
    addUser,
    updateUserPassword

} = require('./user.controller');
const router = require("express").Router();
const verifyInfo = require('../verifyInfo');


router.get('/user/getUser', getUser);

router.post('/user/authorization', authorization);

router.post('/user/addUser', addUser);

router.put('/user/updateUserPassword', updateUserPassword);

module.exports = router;