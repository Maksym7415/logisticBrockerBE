const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const seq = require('../database/dbmysql');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');

module.exports = {
    authorization: async (req, res, next) => {
        try {
            const {
                login,
                password
            } = req.body;
            let user = await seq.models.user.findOne({
                where: {
                    login: login
                }

            });

            if (user && bcrypt.compareSync(password, user.password)) {
                let token = jwt.sign({
                        sub: {
                            id_user: user.id,
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
    },
    updateUserPassword: async (request, response, next) => {
        const { body } = request;
        const salt = genSaltSync(10);
        try {
          const user = await seq.models.user.findOne({ where: { login: body.login } });

          if (!user) next(createError(400, 'Не найденно такого юзера'));

          else if (compareSync(body.password, user.dataValues.password)) {

            body.newPassword = hashSync(body.newPassword, salt);
            await seq.models.user.update({ password: body.newPassword }, {
              where: { login: user.login },
            }).then((res) => response.json({ status: 200, message: 'Successed password change', stack: res }));
          } else next(createError(400, 'old password ist not correct'));
        } catch (err) {
          response.send(err);
        }
      }
}