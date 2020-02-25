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
    /*addUser: async (req, res, next) => {
        let {
            login,
            password,
            role,
            name,
            email,
        } = req.body
        //проверка на то есть ли такой логин или почта в системе
        let user = await userTable.findAll({
            where: {
                [Op.or]: [{
                        login: login,
                    },
                    {
                        email: email || null,
                    }
                ]
            }
        });
        if (user.length === 0) {
            try {
                const hash = bcrypt.hashSync(password, 8)
                let query = await userTable.create({
                    login,
                    password: hash,
                    role,
                    email: email || null,
                }); 
                if (role == "driver") {
                    await seq.models.driver.create({
                        name,
                        phone: req.body.phone,
                        price: req.body.price,
                        fk_user: query.id_user,
                        fk_vehicle: req.body.vehicle,
                    });
                } else if (role == "admin") {
                    await seq.models.admin.create({
                        name,
                        fk_user: query.id_user,
                    });
                } else if (role == "manager") {
                    await seq.models.manager.create({
                        name,
                        fk_user: query.id_user,
                    });
                }
                res.json(query);

            } catch (e) {
                next(createError(500, e));
            }
        }
        else{
            res.send(user);
        }
    },*/
    addUser: async (req, res, next) => {
        let {
            login,
            password,
            role,
            name,
            email,
        } = req.body;
        let loginCheck = await seq.models.user.count({
            where: {
                login: login
            }
        });
        let emailCheck = await seq.models.user.count({
            where: {
                email: email
            }
        });
        let phoneCheck = await seq.models.driver.count({
            where: {
                phone: req.body.phone
            }
        });
        if (!loginCheck && !emailCheck && !phoneCheck) {
            try {
                const hash = bcrypt.hashSync(password, 8)
                let query = await userTable.create({
                    login,
                    password: hash,
                    role,
                    email: email || null,
                });
                if (role == "driver") {
                    await seq.models.driver.create({
                        name,
                        phone: req.body.phone,
                        price: req.body.price,
                        fk_user: query.id_user,
                        fk_vehicle: req.body.vehicle,
                    });
                } else if (role == "admin") {
                    await seq.models.admin.create({
                        name,
                        fk_user: query.id_user,
                    });
                } else if (role == "manager") {
                    await seq.models.manager.create({
                        name,
                        fk_user: query.id_user,
                    });
                }
                res.json(loginCheck, emailCheck, phoneCheck);

            } catch (e) {
                res.send(e);
            }
        }
        else{
            res.send("Bad");
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