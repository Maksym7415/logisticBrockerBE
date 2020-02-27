const createError = require('http-errors');
const seq = require('../database/dbmysql');
const nodemailer = require('nodemailer');

module.exports = {
    getOrders: async (req, res, next) => {
	    console.log('BODY' +  req.body)
        try {
            const promise = await seq.models.order.findAll({
                include: {
                    model: seq.models.broker,
                    attributes: ['id', 'name'],
                },
                attributes: ['id', 'received', 'pickup', 'deliver', 'air_miles', 'earth_miles'],
                limit:+req.body.limit||50,
                offset:+req.body.offset,
            })
            res.json(promise);
        } catch (error) {
            next(createError(400, error));
        }
    },
    getOrderInfo: async (req, res, next) => {
        try {
            const promise = await seq.models.order.findOne({
                include: {
                    model: seq.models.broker,
                },
                attributes: {
                    exclude: ['broker_id']
                },
                where: {
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
            res.json(promise);
        } catch (error) {
            next(createError(400, error));
        }
    },
    getStakes: async (req, res) => {
        try {
            const promise = await seq.models.stake.findAll({
                include: [{
                        model: seq.models.manager,
                        attributes: {
                            exclude: ['user_id']
                        },
                    },
                    {
                        model: seq.models.order,
                        attributes: {
                            exclude: ['broker_id']
                        },
                        include: {
                            model: seq.models.broker,
                            attributes: ['id', 'name'],
                        }
                    },
                    {
                        model: seq.models.driver,
                    }
                ],
                attributes: ['id', 'created', 'driver_price', 'broker_price', 'percent', 'status'],
                offset: +req.body.offset,
                limit: +req.body.limit || 50,
            });
            res.json(promise);
        } catch (error) {
            next(createError(400, error));
        }
    },
    changeStakeStatus: async (req, res, next) => {
        try {
            await seq.models.stake.update({
                status: req.body.status
            }, {
                where: {
                    id: req.body.id,
                }
            });
            res.send("Status changed to " + req.body.status);
        } catch (error) {
            console.log(error);
            next(createError(400, error.message, {error}));
        }
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
            res.json(promise);
        } catch (error) {
            next(createError(400, error));
        }
    },
    getProfile: async (req, res, next) => {
        try {
            const role = await seq.models.user.findOne({
                where: {
                    id: req.body.id,
                }
            });
            if (role) {
                if (role.role === 'admin') {
                    promise = await seq.models.admin.findOne({
                        where: {
                            user_id: req.body.id,
                        },
                        include: {
                            model: seq.models.user,
                        }
                    });
                    res.json(promise);
                } else if (role.role === 'manager') {
                    promise = await seq.models.manager.findOne({
                        where: {
                            user_id: req.body.id,
                        },
                        include: {
                            model: seq.models.user,
                        }
                    });
                    res.json(promise);
                } else {
                    next(createError(400, 'Wrong user id'));
                }
            } else {
                next(createError(400, 'This user does not exists'));
            }
        } catch (error) {
            next(createError(400, error));
        }
    },
    placeBid: async (req, res, next) => {
        try {
            await seq.models.stake.create({
                driver_price: req.body.driver_price,
                broker_price: req.body.broker_price,
                percent: req.body.percent,
                driver_id: req.body.driver_id,
                order_id: req.body.order_id,
                manager_id: req.body.manager_id,
            });
            res.send('OK');
        } catch (error) {
            next(createError(400, error));
        }
    },
    sendMail: async (req, res, next) => {
        try{
            let {from,to,text,author} = req.body
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                auth: {
                    user: 'telesenstest@gmail.com',
                    pass: '0000abcd'
                }
            });
            if(!text){
                text = "Dear Sir or Madam. Please, could you check our bid offer to your order and leave a response. Our thanks and appreciation.";
            }
            let info = {
                from,
                to,
                subject: "Bid request",
                html:`${text}<br/>Transporter LLC<br/>${author.name}<br/>${author.mail}`,
            };
    
            transporter.sendMail(info, (error, info) => {
                if (error) {
                    console.log(error);
                    next(createError(504, error));
                } else {
                    console.log('Email sent: ' + info.response);
                    res.send("Email successfully sent");
                }
            });
        }
        catch(error){
            next(createError(400, error.message, {error}));
        }
    }
}
