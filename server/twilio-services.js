var express = require('express');

var exports = module.exports = {};

// Twilio Credentials 
var accountSid = 'AC21b8290923be5bd38d4a216aaceba567'; 
var authToken = 'b306cd858751dfd31fe86b113d373d45'; 
 
//require the Twilio module and create a REST client 
var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);



exports.sendTestMessage = function() {
  client.messages.create({ 
    to: "+19728961735", 
    from: "+14695027603", 
    body: "This is the ship that made the Kessel Run in fourteen parsecs?", 
  }, function(err, message) { 
    console.log(message.sid); 
  });
}
