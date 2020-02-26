const createError = require('http-errors');
const uuidv1 = require('uuidv1')
const seq = require('../database/dbmysql');
const photoTable = require('../models/photo');

module.exports = {
    getDriver: async (req, res) => {
        try {
            const promise = await seq.models.driver.findOne({
                include: {
                    model: seq.models.stake,
                    attributes: ['driver_price', 'status'],
                    // where: {
                    //     status: 'Accepted',
                    // },
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
    addPhoto:  (req, res, next) => {
        const { orderId } = req.body;
        try {
          req.files.map(async (el) => await photoTable.create({ name: el.filename, id_photo: uuidv1(), fk_order: orderId }));
          res.status(200).json({ message: 'Ok' });
        } catch (err) {
          res.status(400).json({ message: 'error' });
        }
      },
}