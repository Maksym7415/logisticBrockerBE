const createError = require('http-errors');
const seq = require('../database/dbmysql');
const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res, next) => {
        let {
            login,
            password,
            role,
            name,
            email,
            phone
        } = req.body;
        try {
            let loginParse = /(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[a-z0-9A-Z]{6,}/g.test(login);
            let passwordParse = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[a-z0-9A-Z]{6,8}$/g.test(password);
            let emailParse = /^[a-zA-Z0-9]+\@[a-z]+\.[a-z]{2,5}$/g.test(email);
            
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
                    phone: req.body.phone || null
                }
            });
            if (!loginCheck && !emailCheck && !phoneCheck) {
                if (role == 'driver') {
                    let phoneParse = /^\d{8,12}$/.test(phone);
                    if (!loginParse || !passwordParse || !emailParse || !phoneParse) {
                        next(createError(400, 'Invalid values', {
                            stack: {
                                Login: !loginParse,
                                Password: !passwordParse,
                                Email: !emailParse,
                                Phone: !phoneParse
                            }
                        }));
                    } else {
                        const hash = bcrypt.hashSync(password, 8)
                        let query = await seq.models.user.create({
                            login,
                            password: hash,
                            role,
                            email: email || null,
                        });
                        await seq.models.driver.create({
                            name,
                            phone: req.body.phone,
                            price: req.body.price,
                            user_id: query.id,
                            vehicle_id: req.body.vehicle,
                        });    
                    }

                }
                else if(role != 'driver'){
                    if (!loginParse || !passwordParse || !emailParse) {
                        next(createError(400, 'Invalid values', {
                            stack: {
                                Login: !loginParse,
                                Password: !passwordParse,
                                Email: !emailParse,
                            }
                        }));
                    }
                    const hash = bcrypt.hashSync(password, 8)
                        let query = await seq.models.user.create({
                            login,
                            password: hash,
                            role,
                            email: email || null,
                        });
                    if(role == 'admin'){
                        await seq.models.admin.create({
                            name,
                            user_id: query.id,
                        });
                    }
                    else if(role == 'manager'){
                        await seq.models.manager.create({
                            name,
                            user_id: query.id,
                        });
                    }
                }
            } else {
                next(createError(400, 'Duplicate values', {
                    stack: {
                        Login: !!loginCheck,
                        Email: !!emailCheck,
                        Phone: !!phoneCheck
                    }
                }));
            }
        } catch (error) {
            next(createError(400, error));
        }
    },
}