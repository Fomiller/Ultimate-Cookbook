// const path = require('path');

// require custom middleware isAuthenticated
var isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function(app){
    // login in page
    app.get('/', function(req, res){
        if (req.user) {
            res.render('members');
        }
        res.render('signup');
    });

    app.get('/login', function(req, res) {
        console.log(req.user);
        if (req.user) {
            res.redirect('/members');
        }
        res.render('index');
    });

    // signup page
    app.get('/signup', function(req, res) {
        res.render('signup');
    });

    // members page, served after successful login
    app.get('/members', isAuthenticated, function(req, res) {
        res.render('members');
    });

    //not used route
    app.get('recipes', function(req, res){
        console.log('found the page');
        res.json('okii');
    });
    //above route not used

    //route to send user to add-recipe view
    app.get('/add-recipe', function(req, res){
        res.render('add-recipe');
    });

};

