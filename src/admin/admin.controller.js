const createError = require('http-errors');
const seq = require('../database/dbmysql');
const {
    Op
} = require("sequelize");
const nodemailer = require('nodemailer');

module.exports = {
    getOrders: async (req, res, next) => {
        try {
            if (req.token.role == 'admin') {
                const promise = await seq.models.order.findAll();
                res.send(promise);
            } else {
                res.status(400).send('You are not admin');
            }
        } catch (error) {
            next(createError(400, error))
        }
    },

    setOrders: async (req, res, next) => {
        try {
            if (req.token.role == 'admin') {
                const promise = await seq.models.order.create({
                    description: req.body.description,
                    status: req.body.status,
                    price: req.body.price
                });
                res.send(promise);
            } else {
                res.status(400).send('You are not admin');
            }
        } catch (error) {
            next(createError(400, error));
        }
    },

    filterOrders: async (req, res, next) => {
        try {
            if (req.token.role == 'admin') {
                const promise = await seq.models.order.findAll({
                    where: {
                        price: {
                            [Op.gte]: 500,
                        }
                    }
                })
                res.send(promise);
            } else {
                res.status(400).send('You are not admin');
            }
        } catch (error) {
            next(createError(400, error));
        }
    },
}