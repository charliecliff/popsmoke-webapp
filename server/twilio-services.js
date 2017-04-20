var express       = require('express');
var twilio        = require('twilio');
var userServices  = require('./user-services');

var exports = module.exports = {};

// Twilio Credentials 
var accountSid = 'AC21b8290923be5bd38d4a216aaceba567'; 
var authToken  = 'b306cd858751dfd31fe86b113d373d45'; 
 
var client = new twilio.RestClient(accountSid, authToken);

//------------------------------------------------------------------------------
// PUBlIC INTERFACE
//------------------------------------------------------------------------------

exports.sendPassCodeMessage = function(user, callback) {
  console.log("sendPassCodeMessage");
  console.log("phoneNumber: " + user['userID']);
  console.log("pass code: "   + user['password']);
  
  client.messages.create({ 
    to: "+19728961735", 
    from: "+14695027603", 
    body: "This is the ship that made the Kessel Run in fourteen parsecs?", 
  }, function(err, message) {    
    if (err) {
      callback(err);
      return; 
    }
    callback(null);
  });
}

exports.resetPassCodeForUser = function(user, callback) {
  console.log("resetUserPasscode");
  user["password"] = newPassCode();
  callback(null, user);
}

//------------------------------------------------------------------------------
// PASS CODE HELPERS 
//------------------------------------------------------------------------------

function newPassCode() {
  console.log("newPassCode");
  return "444444";
}

//------------------------------------------------------------------------------
// MESSAGING HELPERS 
//------------------------------------------------------------------------------

function newTextMessageFromAuthenticationShortCode(shortCode) {
  console.log("newTextMessageFromAuthenticationShortCode");
  return shortCode;
}
