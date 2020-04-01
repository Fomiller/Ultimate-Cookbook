const db = require('../models');

module.exports = function(app){
    app.get('/api', function(req, res){
        console.log(req.params);
        db.User.findAll({}).then(r=>{
            console.log(r);
            res.json(r);
        });
    });

    app.get('api/recipes', function(req,res){
        db.Recipe.findAll({}).then(r=>{
            console.log(r);
            res.json(r);
        });
    });
};