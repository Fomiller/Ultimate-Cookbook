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

};

