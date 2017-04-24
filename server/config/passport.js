var express       = require('express');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userService   = require("../user-services");

//------------------------------------------------------------------------------
// PUBlIC INTERFACE
//------------------------------------------------------------------------------

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.userID);
  });

  passport.deserializeUser(function(userID, done) {
    let phoneNumber = userID;
    userService.getUserWithPhoneNumber(phoneNumber, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local', new LocalStrategy({
      usernameField : 'userID',
      passwordField : 'password',
      passReqToCallback : true,
    },
    function(req, userID, password, done) {
      let phoneNumber = userID;
      console.log("phoneNumber: " + phoneNumber);

      userService.getUserWithPhoneNumber(phoneNumber, function(err, user) {
        
        console.log("Err: " + JSON.stringify(err));
        console.log("User: " + JSON.stringify(user));

        if (err) {
          return done(err); 
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!(user.password == password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    })
  );
};