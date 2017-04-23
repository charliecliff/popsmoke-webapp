var express       = require('express');
var AWS           = require("aws-sdk");
var userService   = require("./user-services");
var passport      = require('passport');
var localStrategy = require('passport-local').Strategy;

//------------------------------------------------------------------------------
// PUBlIC INTERFACE
//------------------------------------------------------------------------------

module.exports = function(passport) {

  passport.use('local-login', new LocalStrategy({
        usernameField : 'userID',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(username, password, done) {
      
      let phoneNumber = username;
      userService.getUserWithPhoneNumber(phoneNumber, function(err, user) {
        if (err) { 
          return done(err); 
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    })
  );
};