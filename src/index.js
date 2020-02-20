const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const userRouter = require('./users/user.router');
const adminRouter = require('./admin/admin.router');
const managerRouter = require('./manager/manager.router');
const seq = require('./database/dbmysql');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/api', userRouter, adminRouter, managerRouter);


app.use((error, req, res, next) => {
    res.status(error.status || 404);
    res.send({
        status: error.status || 404,
        message: error.message,
        stack: error.stack,
    })
});

seq.sync().then(() => {
    app.listen(port = 8080, () => {
        console.log(`Listening on port ${port}`);
    });
});