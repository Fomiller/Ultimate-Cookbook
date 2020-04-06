// require custom middleware isAuthenticated
var isAuthenticated = require('../config/middleware/isAuthenticated');
const db = require('../models');
const { Op } = require('sequelize');

// const Op = db.sequelize;

module.exports = function(app){

    // Root.
    // I think this could use some looking at...
    // where do we want people to go if they are logged in?
    // do we want a standard landing page for the site?
    app.get('/', function(req, res){
      if (req.user) {
        // if loged in you are directed to your profile.
        console.log('Root html path, for logged in user, should redirect to users profile');
        return res.redirect('/profile');
      }
      // if you are not a logged in user login is RENDERED
      return res.render('login');
    });

    app.get('/login', function(req, res) {
      if (req.user) {
        return res.redirect('/profile');
      }
      return res.render('login');
    });

    // signup page
    app.get('/signup', function(req, res) {
      if(req.user) {
        return res.redirect('/profile');
      } else {
        return res.render('signup');
      }
    });

    // user profile
    app.get('/profile', isAuthenticated, function(req, res) {
      // find user that by id that matches req.user.id
      // include the Recipe table that matches the user(id).
      db.User.findOne({
        where: {
          id: req.user.id
        },
        include: [db.Recipe]
      }).then(users => {
        let usersDV = users.dataValues;
        // stringify the return object so we can access array values
        let usersJSON = JSON.stringify(users, null, 2);
        // create a json object
        let data = JSON.parse(usersJSON);
        // create an array from the recipes array inside data
        let recipes = data.Recipes.map(o => o);
        // create an array that contains an object that has key value pairs matching the users info.
        let userData = [{
          id: usersDV.id,
          username:usersDV.username,
          firstName:usersDV.firstName,
          lastName:usersDV.lastName,
          email:usersDV.email,
          bio:usersDV.bio,
          userImage: usersDV.userImage
        }];
        // render the user template that has 2 partials one for rendering the users info one for handling the users recipes.
        return res.render('profile', {Recipe: recipes, User: userData});
      }).catch(err => res.status(401).json(err));
    });

    app.get('/user/:id', function(req, res) {
      // find user that by id that matches req.params.id
      // include the Recipe table that matches the user(id).
      db.User.findOne({
        where: {
          id: req.params.id
        },
          include: [db.Recipe]
      }).then(users => {
        let usersDV = users.dataValues;
        // stringify the return object so we can access array values
        let usersJSON = JSON.stringify(users, null, 2);
        // create a json object
        let data = JSON.parse(usersJSON);
        // create an array from the recipes array inside data
        let recipes = data.Recipes.map(o => o);
        // create an array that contains an object that has key value pairs matching the users info.
        let userData = [{
          id: usersDV.id,
          username:usersDV.username,
          firstName:usersDV.firstName,
          lastName:usersDV.lastName,
          email:usersDV.email,
          bio:usersDV.bio,
        }];
        // render the user template that has 2 partials one for rendering the users info one for handling the users recipes.
        return res.render('user', {Recipe: recipes, User: userData});
      }).catch(err => res.status(401).json(err));
    });

    //RECIPE ROUTES
    // =========================================================================

    // search recipes
    app.get('/recipes', function(req, res) {
      db.Recipe.findAll({
        include: [db.User, db.Comment]
      }).then(recipes => {
        let recipesJSON = JSON.stringify(recipes,null,2);
        let data = JSON.parse(recipesJSON);
        // now have an array of all columns but how will each comment be displayed in the template to be with the correct recipe???
        // LEAVING THIS FOR REFERENCE MIGHT WANT TO PICK FROM IT...
        // let test = [];
        // data.map(o => o.Comments.forEach(element => test.push(element)));
        // console.log(recipesJSON);
        res.render('recipes', {Recipe: data});
      });
    });


    app.get('/recipe-link', function(req, res) {
      res.render('recipe-link');
      console.log('recipe link page');
    });

    // SEARCH ROUTES
    // =========================================================================

    app.get('/search', function(req, res) {
      res.render('search');
    });

    app.get('/search/:search', function(req, res) {
			let search =req.params.search;
			db.Recipe.findAll({
				where:{
					[Op.or]:
					[
						{recipeName:{[Op.substring]:`%${search}%`}},
						{ingredients:{[Op.substring]:`%${search}%`}},
						{instructions:{[Op.substring]:`%${search}%`}},
						{description:{[Op.substring]:`%${search}%`}},
						{chefComments:{[Op.substring]:`%${search}%`}}
					]
				},
				include:[db.User, db.Comment]
			}).then(function(searches){
        // returned data needs to be stringified then parsed in order to be used
        let searchesJSON = JSON.stringify(searches,null,2);
        let data = JSON.parse(searchesJSON);

        return res.render('search', {Recipe: data});
        }).catch(err => res.status(401).json(err));
    });


    // DONT WANT TO DELETE JUST YET!!!

    // app.get('/search/:recipe', function(req, res) {
    //   let searchBody =req.body.recipe;
    //   let search = req.params.recipe;
    //   console.log(searchBody);
    //   // second argument only returns what is selected from the columns, if left out then the meta data will come back in an array.
    //   // Had to use a MySql query because sequelize wouldnt work.
    //   db.sequelize.query(`SELECT * FROM cookbook_db.recipes JOIN cookbook_db.users ON (users.id = recipes.UserId) WHERE recipeName LIKE '%${search}%' OR ingredients LIKE '%${search}%' OR recipes.description LIKE '%${search}%';`,{ type: db.sequelize.QueryTypes.SELECT})
    //   .then(function(data){
    //       console.log('data: ', data);
    //       return res.render('search', {Recipe: data});
    //     }).catch(err => res.status(401).json(err));
    // });

    app.get('/cloud', function(req, res) {
      return res.render('cloud');
    });

};
