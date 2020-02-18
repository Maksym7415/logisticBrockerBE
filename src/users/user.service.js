const con = require('../database/dbmysql');

let data = (request) => new Promise((res, rej) => {
    con().query(request, (err, result) => {
        if (err) {
            rej(err);
        } 
        else {
            res(result);
        }
    })
});

module.exports = data;