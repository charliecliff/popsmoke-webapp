var express       = require('express');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userService   = require("../user-services");

//------------------------------------------------------------------------------
// PUBlIC INTERFACE
//------------------------------------------------------------------------------

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    console.log("serializeUser");
    done(null, user.userID);
  });

  passport.deserializeUser(function(id, done) {
    console.log("deserializeUser");
    userService.getUserWithPhoneNumber(phoneNumber, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-login', 
    new LocalStrategy({
      usernameField : 'userID',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(username, password, done) {
      
      console.warn("local-login");

      let phoneNumber = username;
      
      userService.getUserWithPhoneNumber(phoneNumber, function(err, user) {
        if (err) {

          console.warn("local-login: err");
          return done(err); 
        }
        if (!user) {
                console.warn("local-login username");

          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
                console.warn("local-login password");

          return done(null, false, { message: 'Incorrect password.' });
        }
              console.warn("local-login success");

        return done(null, user);
      });
    })
  );
};