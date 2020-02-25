const {
    getDriver,
    changeDriverStatus,
    changeDriverGeocoords,
} = require('./driver.controller');
const router = require("express").Router();

router.post('/driver/getDriver', getDriver);

router.put('/driver/changeDriverStatus', changeDriverStatus);

router.put('/driver/changeDriverGeocoords', changeDriverGeocoords);

module.exports = router;