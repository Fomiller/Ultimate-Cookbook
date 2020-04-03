// require custom middleware isAuthenticated
var isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function(app){

    // Root.
    // if you are a user then members is RENDERED.
    app.get('/', function(req, res){
      if (req.user) {
        console.log('we were here');
        return res.redirect('/members');
      }
      // if you are not a logged in user login is RENDERED
      return res.render('login');
    });

    app.get('/login', function(req, res) {
      console.log(req.user);
      if (req.user) {
        return res.redirect('/members');
      }
      return res.render('index');
    });

    // signup page
    app.get('/signup', function(req, res) {
      return res.render('signup');
    });

    // members page, served after successful login
    // working correctly. if i restart the server and go to the root and then try to go to '/members' i am redirected to '/'.
    // this is made possible by the isAuthenticated middleware.

    app.get('/members',isAuthenticated, function(req, res) {
      if(req.user){
        return res.render('members');
      }else{
        return res.redirect('/login');
      }
    });

    //not used route
    app.get('/recipes', function(req, res){
        console.log('found the page');
        return res.render('add-recipe');
    });

    //this should be in api routes
    app.get('/add-recipe', function(req, res){
      return res.render('add-recipe');
    });

    // user profile
    app.get('/profile', isAuthenticated, function(req, res) {
      res.render('user-profile');
      console.log('profile log ', req.session);
    });

    // search recipes
    app.get('/all-recipes', function(req, res) {
      res.render('all-recipes');
      console.log('All recipes page');
    });

    app.get('/recipe-link', function(req, res) {
      res.render('recipe-link');
      console.log('recipe link page');
    });
};
