var express       = require('express');
var userServices  = require('./user-services');

var exports = module.exports = {};

// Twilio Credentials 
var accountSid = 'AC21b8290923be5bd38d4a216aaceba567'; 
var authToken = 'b306cd858751dfd31fe86b113d373d45'; 
 
var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

exports.sendAuthenticationShortCode = function(phoneNumber, callback) {
  
  console.log("sendAuthenticationShortCode");
  console.log(phoneNumber);

  // var sendSMSCallback = sendTestMessage(callback);
  
  var assignShortCodeCallback = assignNewShortCodeToUser(err, user)
  
  userServices.getRegisteredUserWithPhoneNumber(phoneNumber, assignNewShortCodeToUser);
}

function assignNewShortCodeToUser(err, user, callback) {
    if (err){
      user = userServices.createUserWithPhoneNumber(phoneNumber);
    }
    user["password"] = newAuthenticationShortCode();
    userServices.postUserToAmazonDynamoTEST(user, callback);
}

// var myCallback = function(err, data) {
//   if (err) throw err; // Check for the error and throw if it exists.
//   console.log('got data: '+data); // Otherwise proceed as usual.
// };

function setNewShortCodeForUser(err, user) {
  if (err){
     user = userServices.createUserWithPhoneNumber(phoneNumber);
  }
  user["password"] = newAuthenticationShortCode();
  userServices.postUserToAmazonDynamoTEST(user, );
    
  sendTestMessage();
}

function newAuthenticationShortCode() {
  console.log("newTextMessageCode");
  return "444444";
}

function newTextMessageFromAuthenticationShortCode(shortCode) {
  console.log("newTextMessageFromAuthenticationShortCode");
  return shortCode;
}

// TESTING THAT CAN BE REMOVED
function sendTestMessage() {
  client.messages.create({ 
    to: "+19728961735", 
    from: "+14695027603", 
    body: "This is the ship that made the Kessel Run in fourteen parsecs?", 
  }, function(err, message) { 
    console.log(message.sid); 
  });
}
