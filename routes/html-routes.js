// require custom middleware isAuthenticated
var isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function(app){

    // Root.
    // if you are a user then members is RENDERED.
    app.get('/', function(req, res){
      if (req.user) {
        res.redirect('/members');
      }
      // if you are not a logged in user login is RENDERED
      res.render('login');
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
    // working correctly. if i restart the server and go to the root and then try to go to '/members' i am redirected to '/'.
    // this is made possible by the isAuthenticated middleware.

    app.get('/members', isAuthenticated, function(req, res) {
      console.log(req.session);
      res.render('members');
    });

    //not used route
    app.get('/recipes', function(req, res){
        console.log('found the page');
        res.json('okii');
    });

    //this should be in api routes
    app.get('api/recipes', function(req, res){
      console.log('found the page');
      res.json('okii');
    });

    // user profile
    app.get('/profile', isAuthenticated, function(req, res) {
      console.log('profile log ', req.session);
      res.render('user-profile');
    });

    // search recipes
    app.get('/all-recipes', function(req, res) {
      res.render('browse-recipe');
      console.log('All recipes page');
    })
};

