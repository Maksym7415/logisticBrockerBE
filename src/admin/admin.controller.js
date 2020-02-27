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
        } = req.body;
        let loginParse = /(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[a-z0-9A-Z]{6,}/g.test(login);
        let passwordParse = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[a-z0-9A-Z]{6,8}$/g.test(password);
        if (!loginParse || !passwordParse) {
            next(createError(400, 'Invalid values', {
                stack: {
                    Login: !loginParse,
                    Password: !passwordParse,
                }
            }));
        }
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
                phone: req.body.phone || null,
            }
        });
        if (!loginCheck && !emailCheck && !phoneCheck) {
            try {
                const hash = bcrypt.hashSync(password, 8)
                let query = await seq.models.user.create({
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
                        user_id: query.id,
                        vehicle_id: req.body.vehicle,
                    });
                } else if (role == "admin") {
                    await seq.models.admin.create({
                        name,
                        user_id: query.id,
                    });
                } else if (role == "manager") {
                    await seq.models.manager.create({
                        name,
                        user_id: query.id,
                    });
                }
                res.send("OK");

            } catch (error) {
                next(createError(400, error))
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
    },
}