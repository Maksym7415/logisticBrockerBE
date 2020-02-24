const createError = require('http-errors');
const seq = require('../database/dbmysql');

module.exports = {
    getDriver: async (req, res) => {
        try{
            const promise = await seq.models.driver.findAll({
                include:{
                    model: seq.models.order,
                    as:"orders",
                    through:{
                        model:seq.models.stake,
                        where:{
                            status: true,
                        }
                    }
                }
            });
            res.send(promise);
        }
        catch(error){
            console.log(error);
        }
    }
}