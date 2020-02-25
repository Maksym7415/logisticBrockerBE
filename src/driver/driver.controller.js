const createError = require('http-errors');
const seq = require('../database/dbmysql');
const photoTable = require('../models/photo');

module.exports = {
    getDriver: async (req, res) => {
        try {
            const promise = await seq.models.driver.findOne({
                include: {
                    model: seq.models.stake,
                    attributes: ['driver_price', 'status'],
                    where: {
                        status: 'Accepted',
                    },
                    include: {
                        model: seq.models.order,
                        attributes: {
                            exclude: ['fk_broker', 'price']
                        },
                    }
                },
                where: {
                    id_driver: req.body.id,
                },
            })
            res.send(promise);
        } catch (error) {
            console.log(error);
        }
    },
    changeDriverStatus: async (req, res, next) => {
        console.log("aa");
        try {
            const promise = await seq.models.driver.update({
                status: req.body.status
            }, {
                where: {
                    id_driver: req.body.id,
                }
            });
            res.send(req.body.status);
        } catch (error) {
            console.log(error);
        }
    },
}