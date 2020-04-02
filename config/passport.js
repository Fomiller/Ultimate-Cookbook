// Require models and passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

db = require('../models');

passport.use(new LocalStrategy(

	{
		usernameField: 'email'
	},
	function(email, password, done) {
		db.User.findOne({
			where: {
				email: email
			},
		}).then(function(dbUser) {
			// if there is no user with the given email
			if (!dbUser) {
				return done(null, false, {
					message: 'Incorrect email.'
				});
				// if there is a user with the correct given email but the passowrd is wrong
			}	else if (!dbUser.validPassword(password)) {
					return done(null, false, {
						message: 'Incorrect password.'
					});
				}
			// if none of the above, return user... User email and password are correct.
			return done(null, dbUser);
		});
	}

));

// Boiler plates that serialize and deserialize the user
// makes every thing work. Do not touch!
passport.serializeUser(function(user, cb) {
	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});

module.exports = passport;