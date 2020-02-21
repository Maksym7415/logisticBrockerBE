const createError = require('http-errors');
const adminTable = require('../models/admin');
const {
    Op
} = require("sequelize");
const nodemailer = require('nodemailer');

module.exports = {
    getOrders: async (req, res, next) => {
        try {
            if (req.token.role == 'admin') {
                const promise = await orderTable.findAll();
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
                const promise = await orderTable.create({
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
                const promise = await orderTable.findAll({
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

    sendEmail: async (req, res) => {
        let transporter = nodemailer.createTransport({
            host: "smtp.trash-mail.com",
            auth: {
                user: 'logisticBroker@opentrash.com', // generated ethereal user
                pass: '123' // generated ethereal password
            }
        }); // send mail with defined transport object
        let info = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "kir221dol@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello wor", // plain text body
        };

        transporter.sendMail(info, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                res.send('Email sent: ' + info.response);
            }
        });
    }
}