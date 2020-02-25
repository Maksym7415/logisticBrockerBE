const createError = require('http-errors');
const seq = require('../database/dbmysql');
const brokerTable = require('../models/broker');
const driverTable = require('../models/driver');
const vehicleTable = require('../models/vehicle');
const managerTable = require('../models/manager');
const nodemailer = require('nodemailer');

module.exports = {
    getOrders: async (req, res, next) => {
        try {
            const promise = await seq.models.order.findAll({
                include:{
                    model:seq.models.broker,
                    attributes:['id_broker', 'name'],
                },
                attributes:['id_order', 'received', 'pickup', 'deliver', 'air_miles', 'earth_miles'],
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
                attributes:{exclude:['fk_broker']},
                where:{
                    id_order: req.body.order,
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
                    attributes:{exclude:['fk_user']},
                },
                {
                    model: seq.models.order,
                    attributes:{exclude:['fk_broker']},
                    include: {
                        model: seq.models.broker,
                        attributes:['id_broker', 'name'],
                    }
                }
            ],
            attributes:['created', 'driver_price', 'broker_price', 'percent', 'status'],
        });
        res.send(promise);
    }
}