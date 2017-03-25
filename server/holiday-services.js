
var exports = module.exports = {};

exports.getUserHolidaysFromAmazonDynamo = function(res, userID) {
  var AWS = require("aws-sdk");       
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var params = {
      Key: { "userID": { S: userID } }, 
      TableName: "popsmoke-holidays"
  };
  dynamodb.getItem(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); 
      } else {
        console.log(data); 
      }
  });
}

exports.putUserHolidaysToAmazonDynamo = function(res, user) {
  var AWS = require("aws-sdk");       
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var params = {
      Item: user, 
      ReturnConsumedCapacity: "TOTAL", 
      TableName: "popsmoke-holidays"
  };
  dynamodb.putItem(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
          console.log(data);
      }
  });
}

exports.postUserHolidaysToAmazonDynamo = function(res, user) {
  var AWS = require("aws-sdk");       
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var params = {
      Item: user, 
      ReturnConsumedCapacity: "TOTAL", 
      TableName: "popsmoke-holidays"
  };
  dynamodb.putItem(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
          console.log(data);
      }
  });
}

exports.deleteUserHolidaysFromAmazonDynamo = function(res, userID) {
  var AWS = require("aws-sdk");       
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var params = {
    Key: { "userID": { S: userID } }, 
    TableName: "popsmoke-holidays"
  };
  dynamodb.deleteItem(params, function(err, data) {
    if {
      (err) console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });
}