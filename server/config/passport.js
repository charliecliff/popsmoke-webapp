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

  passport.deserializeUser(function(id, done) {
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
      
      console.log("local");

      let phoneNumber = userID;
      
      userService.getUserWithPhoneNumber(phoneNumber, function(err, user) {
        
        console.log("iser: " + JSON.stringify(user) );

        if (err) {
          console.log("local-login: err");
          return done(err); 
        }
        if (!user) {
                console.log("local-login username");

          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!(user.password == password)) {
                console.log("local-login password");

          return done(null, false, { message: 'Incorrect password.' });
        }
              console.log("local-login success");

        return done(null, user);
      });
    })
  );
};