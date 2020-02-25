const createError = require('http-errors');
const seq = require('../database/dbmysql');
const brokerTable = require('../models/broker');
const driverTable = require('../models/driver');
const vehicleTable = require('../models/vehicle');
const managerTable = require('../models/manager');
const nodemailer = require('nodemailer');
const { QueryTypes } = require('sequelize');

module.exports = {
    getOrders: async (req, res, next) => {
        try {
            /*const promise = await seq.models.broker.findAll({
                include: {
                    model: seq.models.order,
                    attributes:['id_order', 'received', 'pickup', 'deliver', 'air_miles', 'earth_miles'],
                },
                attributes:['id_broker', 'name'],
            });*/
            const promise = await seq.query('select `id_order`, `received`, `pickup`, `deliver`, `air_miles`,'+
            '`earth_miles`, `name` from `orders`, `brokers` where `fk_broker` = `id_broker`', 
            {type: QueryTypes.SELECT});
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
                    attributes:{exclude:['fk_broker']},
                    where:{
                        id_order:req.body.order,
                    }
                },
            });
            res.json(promise);
        }
        catch(error){
            next(createError(400, error));
        }
    },
    getDrivers: async (req, res, next) => {
        try{
            const promise = await seq.models.driver.findAll({
                include:{
                    model:seq.models.vehicle,
                }
            });
            res.send(promise);
        }
        catch(error){
            next(createError(400, error));
        }
    },
    getStakes: async(req, res) => {
        /*const promise = await seq.models.broker.findAll({
            attributes:['id_broker', 'name'],
            include:{
                model:seq.models.order,
                attributes:['id_order', 'pickup', 'deliver', 'air_miles', 'earth_miles'],
                include:{
                    model:seq.models.manager,
                    attributes:['id_manager', 'name'],
                    as:'managers',
                    through:{
                        model:seq.model.stake,
                        attributes:['id_stake','driver_price', 'broker_price', 'percent'],
                    }
                }
            }
        })*/
        //наилучший вариант 
        const promise = await seq.query('select `created`, `brokers`.`name` as `brokerage`, `pickup`, `deliver`, `air_miles`,'+
        ' `earth_miles`,`driver_price`, `broker_price`, `managers`.`name` as `dispatcher` from `stakes`,`orders`,`brokers`,`managers`'+
        ' where `fk_order` = `id_order` and `fk_manager` = `id_manager` and `fk_broker` = `id_broker`', 
        {type: QueryTypes.SELECT});
        res.send(promise);
    }
}