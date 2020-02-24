const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userTable = require('../models/user');
const saltRounds = 10;
const { Op } = require('sequelize')


decryptInfo = (info) => {
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(info, salt);
    return hash;
}

module.exports = {

    addUser: async (req, res, next) => {
        let {login, password, role} = req.body
        let user = await userTable.findAll({where: {[Op.or]: [
            {login: login},
            ]}
        })
        if (user.length === 0) {
        try {
            const hash = bcrypt.hashSync(password, 8)
            let query = await userTable.create({
                login,
                password: bcrypt.hashSync(password, 8),
                role   
            }) // writing new user in database
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
        try{
            const {login, password} = req.body;
            let user = await userTable.findOne({
                where: {
                    login: login
                }
            });
            
            if(user && bcrypt.compareSync(password, user.password)){
                let token = jwt.sign({
                    id_user: user.id_user,
                    role: user.role,},
                    'secretKey'
                );
    
                user.token = token;
                await user.save();  
                res.send(token);
            }
            else {
                next(createError(400, 'Wrong login or password'));
            }
        }
        catch(error){
            console.log(error);
        }
    }
    /*getAdmin: async(req, res) => {
        const promise = await adminTable.findAll();
        res.send(promise);
    },
    getDriver: async(req, res) => {
        const promise = await driverTable.findAll();
        res.send(promise);
    },
    getManager: async(req, res) => {
        const promise = await managerTable.findAll();
        res.send(promise);
    },
    getVehicle: async(req, res) => {
        const promise = await vehicleTable.findAll();
        res.send(promise);
    },*/

/*
    addUser: async (req, res, next) => {
        try {
            let password = decryptInfo(req.body.password);
            const user = await userTable.create({
                login: req.body.login,
                password: password,
                role: 'user',
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
            let data = await userTable.findOne({
                where: {
                    login: req.body.login
                }
            });

            await tokenTable.destroy({
                where: {
                    fk_user: data.user_id
                }
            });

            const promise = await userTable.destroy({
                where: {
                    login: data.login
                }
            });

            if (!promise) {
                next(createError(400, 'No such user'));
            } else {
                res.send('User successfully deleted')
            }
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
                    id: user.user_id,
                    role: user.role,
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

    secretPage: async (req, res, next) => {
        try {
            if (req.token.role == 'user') res.send("Hello user");
            else res.send('Hello admin');
        } catch (error) {
            next(createError(403, 'You are not authorized'));
        }
    },*/
}