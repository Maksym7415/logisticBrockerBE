const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userTable = require('../models/user');
const seq = require('../database/dbmysql');
const saltRounds = 10;
const {
    Op
} = require('sequelize')


module.exports = {
    check: async (req, res, next) => {
        const hash = bcrypt.hashSync('ee', 8)
        res.send(hash);
    },
    addUser: async (req, res, next) => {
        let {
            login,
            password,
            role,
            name,
        } = req.body
        let user = await userTable.findAll({
            where: {
                [Op.or]: [{
                    login: login
                }, ]
            }
        })
        if (user.length === 0) {
            try {
                const hash = bcrypt.hashSync(password, 8)
                let query = await userTable.create({
                    login,
                    password: bcrypt.hashSync(password, 8),
                    role,
                    email: req.body.email||null,
                }); // writing new user in database
                // fsdfsd
                if(role == "driver"){
                    await seq.models.driver.create({
                        name,
                        phone: req.body.phone,
                        fk_user: query.id_user,
                        fk_vehicle: req.body.vehicle,
                    });
                }
                else if(role == "admin"){
                    await seq.models.admin.create({
                        name, 
                        fk_user: query.id_user,
                    });
                }
                else if(role == "manager"){
                    await seq.models.manager.create({
                        name,
                        fk_user: query.id_user,
                    });
                }
                res.json(query)
            } catch (e) {
                next(createError(500, e))
            }
        }
    },

    getUser: async (req, res) => {
        const promise = await userTable.findAll();
        res.send(promise);
    },


    authorization: async (req, res, next) => {
        try {
            const {
                login,
                password
            } = req.body;
            let user = await userTable.findOne({
                where: {
                    login: login
                }

            });

            if (user && bcrypt.compareSync(password, user.password)) {
                let token = jwt.sign({
                        sub: {
                            id_user: user.id_user,
                            role: user.role
                        }
                    },
                    'secretKey'
                );

                user.token = token;
                await user.save();
                res.send(token);
            } else {
                next(createError(400, 'Wrong login or password'));
            }
        } catch (error) {
            console.log(error);
        }
    }
}