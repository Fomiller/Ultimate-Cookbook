// require custom middleware isAuthenticated
var isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function(app){

    // Root.
    // if you are a user then members is RENDERED.
    app.get('/', function(req, res){
      if (req.user) {
        console.log('we were here');
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
        res.render('add-recipe');
    });

    //this should be in api routes
    app.get('/add-recipe', function(req, res){
      res.render('add-recipe');
    });
};

