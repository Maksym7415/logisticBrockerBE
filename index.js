const express = require('express');
const bearerToken = require('express-bearer-token');
const app = express();
const http = require('http').createServer(app);
require('dotenv').config();
const bodyParser = require('body-parser');
const userRouter = require('./src/users/user.router');
const adminRouter = require('./src/admin/admin.router');
const managerRouter = require('./src/manager/manager.router');
const driverRouter = require('./src/driver/driver.router');
const seq = require('./src/database/dbmysql');
var cors = require('cors');
const connection = require('./src/database/connection');

app.use(cors());

app.use(bearerToken());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/api', userRouter, adminRouter, managerRouter, driverRouter);

app.use((error, req, res, next) => {
    res.status(error.status || 404);
    res.send({
        status: error.status || 404,
        message: error.message,
        stack: error.stack,
    })
});

seq.sync().then(() => {
    http.listen(8080, async () => {
        console.log(`Listening on port ${8080}`);
    });
});

