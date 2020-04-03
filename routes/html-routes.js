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

    app.get('/members', function(req, res) {
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
};

