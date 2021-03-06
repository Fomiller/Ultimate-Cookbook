require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
// required passport from configured file
const passport = require('./config/passport');

// set up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require('./models');

// create app with express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// this code was used for passport session
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Requiring our routes when we build them
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);


db.sequelize.sync({force: false}).then(function() {
  app.listen(PORT, function() {
    console.log('App listening at http://localhost:' + PORT);
  });
});