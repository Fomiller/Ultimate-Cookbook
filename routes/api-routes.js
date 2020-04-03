const db = require('../models');
const passport = require('passport');

module.exports = function(app){

    // use passport to authenticate the login credentials.
    app.post('/api/login', passport.authenticate('local'), function(req, res) {
			console.log('From post to api/login', req.user);
			return res.json(req.user);
		});

		// logout
		app.get('/logout', function(req,res) {
			req.logout();
			return res.redirect('/');
    });

    // create a user
    app.post('/api/signup', function(req, res) {
			console.log('signup ',req.body);
			db.User.create({
				// create values based off of req body
				email: req.body.email,
				password: req.body.password,
				username: req.body.username,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
			}).then(function() {
				// if successful user directed to login page
				return res.redirect(307, '/api/login');
			}).catch(function(err) {
				console.log(err);
				return res.status(401).json(err);
			});
		});

		app.get('/api/userData', function(req, res) {
			if (!req.user) {
				// The user is not logged in, send back an empty object
				return res.json({});
			} else {
				// Otherwise send back the user's email and id
				// Sending back a password, even a hashed password, isn't a good idea
				return res.json({
					email: req.user.email,
					id: req.user.id
				});
			}
		});

		// get all users
		app.get('/api/users', function(req, res){
			db.User.findAll({}).then(function(data) {
				return res.json(data);
			});
		});

		// get all recipes
    app.get('/api/recipes', function(req,res){
			db.Recipe.findAll({}).then(r=>{
				console.log(r);
				return res.json(r);
			});
    });

		// get all comments
    app.get('/api/comments', function(req,res){
			db.Comment.findAll({}).then(r=>{
				console.log(r);
				return res.json(r);
			});
    });

    //add a recipe. req.body is already formatted to match our Recipe model
    app.post('/api/add-recipe', function(req, res){
		if (req.user){
			recipe = req.body;
			recipe.UserId = req.user.id;
			console.log('recipe in api/add-recipe ', recipe);
			db.Recipe.create(recipe)
			.then(()=> res.render('user-profile'))
			.catch(err => res.status(401).json(err));
		} else {
			db.Recipe.create(req.body)
			.then(()=> res.render('index'))
			.catch(err => res.status(401).json(err));
		}
	});

	//delete user with id in request parameters
	app.delete('/api/user/:id', function(req,res){
		db.User.destroy({
			where: {
				id: req.params.id
			}
		}).then(user => res.json(user));
	});

	//delete recipe that has the id in request parameters
	app.delete('/api/recipe/:id', function(req, res){
		db.Recipe.destroy({
			where: {
				id: req.params.id
			}
		}).then(recipe => res.json(recipe));
	});
};