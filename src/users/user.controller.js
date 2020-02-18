const data = require('./user.service');
const createError = require('http-errors');
const userTable = require('../models/user');
const tokenTable = require('../models/token');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;


decryptInfo = (info) => {
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(info, salt);
    return hash;
}

module.exports = {
    getUser: async (req, res) => {
        const promise = await userTable.findAll();
        res.send(promise);
    },

    addUser: async (req, res, next) => {
        try {
            let password = decryptInfo(req.body.password);
            const user = await userTable.create({
                login: req.body.login,
                password: password,
            });
            await tokenTable.create({
                fk_user: user.user_id,
            })
            res.send('User successfully added');
        } catch (error) {
            next(createError(400, 'add user', {
                stack: error
            }))
        }
    },

    changeUserPassword: async (req, res, next) => {
        try {
            let password = decryptInfo(req.body.password);
            const promise = await userTable.update({
                password: password
            }, {
                where: {
                    login: req.body.login
                }
            });
            res.send('Password successfully changed');
        } catch (error) {
            next(createError(400, "change", {
                stack: error
            }));
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const promise = await userTable.destroy({
                where: {
                    login: req.body.login
                }
            })
            res.send('Account successfully deleted!');
        } catch (error) {
            next(createError(400, "delete", {
                stack: error
            }));
        }
    },

    authUser: async (req, res, next) => {
        try {
            let user = await userTable.findOne({
                where: {
                    login: req.body.login
                }
            });

            if (bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign({
                    login: req.body.login,
                    password: req.body.password
                }, 'secretKey');

                await tokenTable.update({
                    token: token,
                }, {
                    where: {
                        fk_user: user.user_id,
                    }
                });
                res.send(token);
            } else {
                next(createError(400, 'Wrong login or password'));
            }
        } catch {
            next(createError(400, 'Wrong login or password!'));
        }
    },

    
}