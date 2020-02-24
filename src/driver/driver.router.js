const {
    getDriver,
    changeDriverStatus
} = require('./driver.controller');
const router = require("express").Router();

router.post('/driver/getDriver', getDriver);

router.put('/driver/changeDriverStatus', changeDriverStatus);

module.exports = router;