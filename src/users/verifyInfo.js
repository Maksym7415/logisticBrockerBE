const jwt = require('jsonwebtoken');

const verifyInfo = (req, res, next) => {
    try {
        let header = req.get("Authorization")||'';
        header = header.replace('bearer ', '');
        jwt.verify(header, 'secretKey', (err, data) => {
            if(err){
                res.status(418).send('You are not authorized');
            }
            else{
                req.token = data;
                next();
            }
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = verifyInfo;