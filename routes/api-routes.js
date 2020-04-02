const db = require('../models');
const passport = require('passport');

module.exports = function(app){

  app.get('/api/users', function(req, res){
        console.log(req.params);
        db.User.findAll({}).then(r=>{
            // console.log(r);
            res.render('add-recipe');
        });
    });

    // use passport to authenticate the login credentials.
    app.post('/api/login', passport.authenticate('local', {failureRedirect: '/'}), function(req, res) {
        console.log(req.user);
        res.json(req.user);
    });

    app.get('/logout', function(req,res) {
        req.logout();
        res.redirect('/');
    });

    // create a user
    app.post('/api/signup', function(req, res) {
        db.User.create({
            // create values based off of req body
            email: req.body.email,
            password: req.body.password
        }).then(function() {
            // if signup is successful then the user is directed to the login page where they can login
            // upon signup a user is NOT logged in.
            res.redirect(307, '/api/login');
        }).catch(function(err) {
            res.status(401).json(err);
        });
    });

    app.get('/api/recipes', function(req,res){
        db.Recipe.findAll({}).then(r=>{
            console.log(r);
            res.json(r);
        });
    });

    app.get('/api/comments', function(req,res){
        db.Comment.findAll({}).then(r=>{
            console.log(r);
            res.json(r);
        });
    });

    app.post('/api/add-recipe', function(req, res){
        console.log('req body ', req.body);
        db.Recipe.create(req.body)
        .then(()=> res.render('index'))
        .catch(err => res.status(401).json(err));
    });
};