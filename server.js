const express = require('express');
//require passport
var PORT = process.env.PORT || 8080;
var db = require('./models');
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// this code was used for passport session
// app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// Requiring our routes when we build them
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log('==> 🌎  Listening at http://localhost:' + PORT);
    });
  });