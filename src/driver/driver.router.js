const {
    getDriver
} = require('./driver.controller');
const router = require("express").Router();

router.post('/driver/getDriver', getDriver);

module.exports = router;