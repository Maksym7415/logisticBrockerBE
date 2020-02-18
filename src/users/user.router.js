const {getUser, addUser, changeUserPassword, deleteUser, authUser/*, secretPage*/} = require('./user.controller');
const router = require("express").Router();

router.get('/getUser', getUser);

router.post('/addUser', addUser);

router.put('/changeUserPassword', changeUserPassword);

router.delete('/deleteUser', deleteUser);

router.post('/authUser', authUser);

/*router.post('/secretPage', secretPage);*/

module.exports = router;

