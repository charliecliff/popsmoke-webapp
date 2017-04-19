var express = require('express');
var AWS = require("aws-sdk");

var exports = module.exports = {};

exports.getUserFromAmazonDynamo = function(res, userID) {
  console.log("getUserFromAmazonDynamo");
  var self = this;
  AWS.config.update({ accessKeyId: "AKIAIDMIESKUD4F657BQ", 
                      secretAccessKey: "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",
                      region:'us-east-1'});      
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var outputMap = new Map();
  outputMap["userID"] = { S: userID };

  var params = { Key: outputMap, 
                 TableName: "popsmoke-users"};
  dynamodb.getItem(params, function(err, data) {
    if (err) {
      console.log("error\n" + err);
      res.status(err.statusCode).send("Problem with AWS");
    } else {
      var userModel = self.buildModelFromAWSMap(data);
      res.send( {User: userModel} );
    }
  });
}


exports.getUserFromAmazonDynamoWithPhoneNumber = function(phoneNumber, callback) {
  console.log("getUserFromAmazonDynamo");
  console.log(phoneNumber);

  AWS.config.update({ accessKeyId: "AKIAIDMIESKUD4F657BQ", 
                      secretAccessKey: "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",
                      region:'us-east-1'});      
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var outputMap = new Map();
  outputMap["userID"] = { S: phoneNumber };

  var params = { Key: outputMap, TableName: "popsmoke-users"};
  dynamodb.getItem(params, function(err, data) {

    console.log("fucking output");
    console.log("date: " + JSON.stringify(data));
    console.log("error: "+ err);
    if (err) {
      callback(err);
    } else if (data == undefined) {
      callback({error: "OH SNAP"});
    } else {
      var user = buildModelFromAWSMap(data);
      callback(null, user);
    }
  });
}
exports.postUserToAmazonDynamoTEST = function(user, callback) {
  AWS.config.update({ accessKeyId: "AKIAIDMIESKUD4F657BQ", 
                      secretAccessKey: "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",
                      region:'us-east-1'});      
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var userMap = this.buildAWSMapFromUser(user);
  var params = { Item: userMap,
                 ReturnConsumedCapacity: "TOTAL", 
                 TableName: "popsmoke-users"
               };
  dynamodb.putItem(params, function(err, data) {
    callback(err);
  });
}


exports.putUserToAmazonDynamo = function(req, res) {
  this.postUserToAmazonDynamo(req, res);
}

exports.postUserToAmazonDynamo = function(req, res) {
  AWS.config.update({ accessKeyId: "AKIAIDMIESKUD4F657BQ", 
                      secretAccessKey: "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",
                      region:'us-east-1'});      
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var userMap = this.buildAWSMapFromUserRequestBody(req.body);
  var userModel = this.buildModelFromUserRequestBody(req.body);
  var params = { Item: userMap,
                 ReturnConsumedCapacity: "TOTAL", 
                 TableName: "popsmoke-users"
               };
  dynamodb.putItem(params, function(err, data) {
      if (err) {
        console.log("error\n" + err);
        res.status(err.statusCode).send("Problem with AWS");
      } else {
        res.send( JSON.stringify( {User: userModel} ));
      }
  });
}

exports.deleteUserFromAmazonDynamo = function(res, userID) {
  console.log("DELETE USER");

  AWS.config.update({ accessKeyId: "AKIAIDMIESKUD4F657BQ", 
                      secretAccessKey: "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",
                      region:'us-east-1'});      
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var params = { Key: { USER_ID: { S: userID } }, 
                 TableName: "popsmoke-users"
               };
  dynamodb.deleteItem(params, function(err, data) {
    if (err) {
      console.log("error\n" + err);
      res.status(err.statusCode).send("Problem with AWS");
    } else {
      console.log("success!!\n" + data);
      res.send(data);
    }
  });
}

/**----------------
----- AWS MAP -----
-----------------*/

exports.createUserWithPhoneNumber = function(phoneNumber) {
  console.log("createUserWithPhoneNumber");
  var user = new Object();
  user.userID = phoneNumber;
  return user;
}

/**
-----------------
---- AWS MAP ----
-----------------

{"Item": 
  {
    "userID": {"S":"pCeFNSIARLSZARUy6jVXW5ZxOD32"}, // This userID is the Phone Number

  }
}
*/

/**
-----------------
-- USER OBJECT --
-----------------
{
  "userID": pCeFNSIARLSZARUy6jVXW5ZxOD32",

}

*/

exports.buildAWSMapFromUserRequestBody = function(requestBody) {
  var outputMap = new Map();
  if ( requestBody.hasOwnProperty("userID") ) {
    outputMap["userID"] = { S: requestBody["userID"] };
  }
  if ( requestBody.hasOwnProperty("firstName") ) {
    outputMap["firstName"] = { S: requestBody["firstName"] };
  }
  if ( requestBody.hasOwnProperty("lastName") ) {
    outputMap["lastName"] = { S: requestBody["lastName"] };
  }
  if ( requestBody.hasOwnProperty("password") ) {
    outputMap["password"] = { S: requestBody["password"] };
  }
  return outputMap;
}

exports.buildModelFromUserRequestBody = function(requestBody) {
  var outputModel = new Object();
  if ( requestBody.hasOwnProperty("userID") ) {
    outputModel.userID = requestBody["userID"];
  }
  return outputModel;
}

exports.buildAWSMapFromUser = function(user) {
  return buildModelFromUserRequestBody(user);
}

function buildModelFromAWSMap(map) {
  console.log("buildModelFromAWSMap");
  console.log("fucking map: " + JSON.stringify(map) );
  var outputModel = new Object();
  var itemMap        = map.Item;
  var userID         = itemMap.userID.S;
  outputModel.userID = userID;
  return outputModel;
}
