const createError = require('http-errors');
const seq = require('../database/dbmysql');
const nodemailer = require('nodemailer');

module.exports = {
    getOrders: async (req, res, next) => {
        try {
            const promise = await seq.models.order.findAll({
                include:{
                    model:seq.models.broker,
                    attributes:['id', 'name'],
                },
                attributes:['id', 'received', 'pickup', 'deliver', 'air_miles', 'earth_miles'],
            })
            res.json(promise);
        } catch (error) {
            next(createError(400, error));
        }
    },
    getOrderInfo: async (req, res, next) => {
        try {
            const promise = await seq.models.order.findOne({
                include:{
                    model:seq.models.broker,
                },
                attributes:{exclude:['broker_id']},
                where:{
                    id: req.body.order,
                }
            })
            res.json(promise);
        } catch (error) {
            next(createError(400, error));
        }
    },
    getDrivers: async (req, res, next) => {
        try {
            const promise = await seq.models.driver.findAll({
                include: {
                    model: seq.models.vehicle,
                }
            });
            res.send(promise);
        } catch (error) {
            next(createError(400, error));
        }
    },
    getStakes: async (req, res) => {
        const promise = await seq.models.stake.findAll({
            include: [{
                    model: seq.models.manager,
                    attributes:{exclude:['user_id']},
                },
                {
                    model: seq.models.order,
                    attributes:{exclude:['broker_id']},
                    include: {
                        model: seq.models.broker,
                        attributes:['id', 'name'],
                    }
                }
            ],
            attributes:['created', 'driver_price', 'broker_price', 'percent', 'status'],
        });
        res.send(promise);
    },
    getDriver: async (req, res, next) => {
        try {
            const promise = await seq.models.driver.findOne({
                include: {
                    model: seq.models.stake,
                    attributes: ['driver_price', 'status'],
                    include: {
                        model: seq.models.order,
                        attributes: {
                            exclude: ['broker_id', 'price']
                        },
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
}