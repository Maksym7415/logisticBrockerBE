const {getUser, addUser, changeUserPassword, deleteUser, authUser, secretPage} = require('./user.controller');
const router = require("express").Router();
const verifyInfo = require('./verifyInfo');

router.get('/getUser', getUser);

router.post('/addUser', addUser);

router.put('/changeUserPassword', changeUserPassword);

router.delete('/deleteUser', deleteUser);

router.post('/authUser', authUser);

router.get('/secretPage', verifyInfo, secretPage);

module.exports = router;

