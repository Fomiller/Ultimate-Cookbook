const db = require('../models');

module.exports = function(app){
    app.get('/', function(req, res){
        console.log(req.params);
        db.Users.findAll({}).then(r=>{
            console.log(r);
            res.json(r);
        });
    });
};