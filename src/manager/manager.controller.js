const createError = require('http-errors');
const seq = require('../database/dbmysql');
//нужно перезаписать бд через секвалайзер
const brokerTable = require('../models/broker');
const nodemailer = require('nodemailer');

module.exports = {
    getOrders: async (req, res, next) => {
        try {
            const promise = await seq.models.broker.findAll({
                include: {
                    model: seq.models.order,
                    attributes:['id_order', 'received', 'pickup', 'deliver', 'air_miles', 'earth_miles'],
                },
                attributes:['id_broker', 'name'],
            });
            res.json(promise);
        } catch (error) {
            next(createError(400, error));
        }
    },
    getOrderInfo: async (req, res, next) => {
        try{
            const promise = await seq.models.broker.findAll({
                include: {
                    model: seq.models.order,
                    attributes:{exclude:['createdAt', 'updatedAt', 'fk_broker']},
                    where:{
                        id_order:req.body.order,
                    }
                },
                attributes:{exclude:['createdAt', 'updatedAt']},
            });
            res.json(promise);
        }
        catch(error){
            next(createError(400, error));
        }
    },
    getDrivers: async (req, res, next) => {
        try{
            const promise = await seq.models.driver.findAll();
            res.send(promise);
        }
        catch(error){
            next(createError(400, error));
        }
    },
    /*sendMail: async (req, res, next) => {
        try{

        }
        catch(error){
            next(createError(400, error));
        }
    }*/
}