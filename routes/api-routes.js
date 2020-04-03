const db = require('../models');
const passport = require('passport');

module.exports = function(app){

    // use passport to authenticate the login credentials.
    app.post('/api/login', passport.authenticate('local'), function(req, res) {
			console.log('From post to api/login', req.user);
			res.json(req.user);
		});

		// logout
		app.get('/logout', function(req,res) {
			req.logout();
			res.redirect('/');
    });

    // create a user
    app.post('/api/signup', function(req, res) {
			db.User.create({
				// create values based off of req body
				email: req.body.email,
				password: req.body.password,
				username: req.body.username,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
			}).then(function() {
				// if successful user directed to login page
				res.redirect(307, '/api/login');
			}).catch(function(err) {
				res.status(401).json(err);
			});
		});

		app.get('/api/userData', function(req, res) {
			if (!req.user) {
				// The user is not logged in, send back an empty object
				res.json({});
			} else {
				// Otherwise send back the user's email and id
				// Sending back a password, even a hashed password, isn't a good idea
				res.json({
					email: req.user.email,
					id: req.user.id
				});
			}
		});

		// get all users
		app.get('/api/users', function(req, res){
			db.User.findAll({}).then(function(data) {
				res.json(data);
			});
		});

		// get all recipes
    app.get('/api/recipes', function(req,res){
			db.Recipe.findAll({}).then(r=>{
				console.log(r);
				res.json(r);
			});
    });

		// get all comments
    app.get('/api/comments', function(req,res){
			db.Comment.findAll({}).then(r=>{
				console.log(r);
				res.json(r);
			});
    });

    //add a recipe. req.body is already formatted to match our Recipe model
    app.post('/api/add-recipe', function(req, res){
        console.log('req body ', req.body);
        db.Recipe.create(req.body)
        .then(()=> res.render('index'))
        .catch(err => res.status(401).json(err));
    });
};