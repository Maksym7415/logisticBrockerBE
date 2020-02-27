const createError = require('http-errors');
const uuidv1 = require('uuidv1')
const seq = require('../database/dbmysql');

module.exports = {
    getDriver: async (req, res) => {
        try {
            const promise = await seq.models.driver.findOne({
                include: {
                    model: seq.models.stake,
                    offset:+req.body.offset || 0,
                    limit:+req.body.limit || 20,
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
    addPhoto:  (req, res, next) => {
        const { orderId } = req.body;
        console.log(orderId)
        try {
          req.files.map(async (el) => await photoTable.create({ name: el.filename, id: uuidv1(), order_id: orderId }));
          res.status(200).json({ message: 'Ok' });
        } catch (err) {
          res.status(400).json({ message: 'error' });
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