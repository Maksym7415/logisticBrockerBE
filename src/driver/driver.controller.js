const createError = require('http-errors');
const seq = require('../database/dbmysql');

module.exports = {
    getDriver: async (req, res) => {
        try {
            const promise = await seq.models.driver.findOne({
                include: {
                    model: seq.models.stake,
                    required: false,
                    where: {
                        status: 'Accepted',
                    },
                    include: {
                        model: seq.models.order,
                    }
                },
                where: {
                    user_id: req.body.id,
                },
            })
            res.send(promise);
        } catch (error) {
            console.log(error);
        }
    },
    changeDriverStatus: async (req, res, next) => {
        try {
            await seq.models.driver.update({
                status: req.body.status
            }, {
                where: {
                    id: req.body.id,
                }
            });
            res.send(req.body.status);
        } catch (error) {
            next(createError(400, 'Wrong status', {stack:error}));
        }
    },
    changeDriverGeocoords: async (req, res, next) => {
        try{
            const promise = await seq.models.driver.update({
                longitude: req.body.longitude,
                latitude: req.body.latitude
            }, {
                where: {
                    id: req.body.id,
                }
            });
            res.send('OK');
        } catch(error){
            next(createError(400, 'Wrong coordinates', {stack:error}));
        }
    }
}