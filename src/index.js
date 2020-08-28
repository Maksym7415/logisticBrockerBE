const express = require('express');
const bearerToken = require('express-bearer-token');
const app = express();
const https = require('https');
require('dotenv').config();
const bodyParser = require('body-parser');
const userRouter = require('./users/user.router');
const adminRouter = require('./admin/admin.router');
const managerRouter = require('./manager/manager.router');
const driverRouter = require('./driver/driver.router');
const seq = require('./database/dbmysql');
var cors = require('cors');
const connection = require('./database/connection');
const fs = require("fs");

const options = {
    key: fs.readFileSync('./src/keys/key.pem').toString(),
    cert: fs.readFileSync('./src/keys/cert.pem').toString(),
    requestCert: false,
    rejectUnauthorized: false
    };

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
    https.createServer(options, app).listen(8080, async () => {
        console.log(`Listening on port ${8080}`);
    });
});
