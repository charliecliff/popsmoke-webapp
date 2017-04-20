var express    = require('express');
var AWS        = require("aws-sdk");
var awsService = require("./aws-services");
var awsConfig  = require("./config/aws-config");

var exports = module.exports = {};

exports.getUserFromAmazonDynamo = function(res, userID) {
  console.log("getUserFromAmazonDynamo");

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
      var userModel = buildModelFromAWSMap(data);
      res.send( {User: userModel} );
    }
  });
}





















exports.getUserWithPhoneNumber = function(phoneNumber, callback) {
  console.log("getUserWithPhoneNumber");
  console.log(phoneNumber);

  var dynamodb = newDynamoBD();
  var params   = awsService.userQueryParams(phoneNumber);
  dynamodb.getItem(params, function(err, data) {

    console.log("fucking output");
    console.log("date: " + JSON.stringify(data));
    console.log("error: "+ err);
    
    if (err) {
      callback(err);
      return;
    }
    if (!data.hasOwnProperty("Item")) {
      registerUserWithPhoneNumber(phoneNumber, callback);
    } else {
      var user = buildModelFromAWSMap(data);
      callback(null, user);
    }
  });
}


exports.resetUserPasscode = function(user, callback) {


  callback(null);
}







































function registerUserWithPhoneNumber(phoneNumber, callback) {
  var user = createUserWithPhoneNumber(phoneNumber);
  postUserToDatabase(user, callback);
}



exports.getUserFromAmazonDynamoWithPhoneNumber = function(phoneNumber, callback) {
  console.log("getUserFromAmazonDynamo");
  console.log(phoneNumber);

  var dynamodb = newDynamoBD();

  var outputMap = new Map();
  outputMap["userID"] = { S: phoneNumber };

  var params = { Key: outputMap, TableName: "popsmoke-users"};
  dynamodb.getItem(params, function(err, data) {
    console.log("fucking output");
    console.log("date: " + JSON.stringify(data));
    console.log("error: "+ err);
    
    if (err) {
      callback(err);
      return;
    }
    var user;
    if (!data.hasOwnProperty("Item")) {
      user = userServices.createUserWithPhoneNumber(phoneNumber);
    } else {
      user = buildModelFromAWSMap(data);
    }
    callback(null, user);
  });
}



exports.postUserToDatabase = function(user, callback) {
  var dynamodb = newDynamoBD();
  var userMap  = buildAWSMapFromUser(user);
  var params   = dynamoPostParamsForUserMap(userMap);
  dynamodb.putItem(params, callback);
}



// exports.putUserToAmazonDynamo = function(req, res) {
//   this.postUserToAmazonDynamo(req, res);
// }

exports.postUserToAmazonDynamo = function(req, res) {
  AWS.config.update({ accessKeyId: "AKIAIDMIESKUD4F657BQ", 
                      secretAccessKey: "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",
                      region:'us-east-1'});      
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var userMap   = buildAWSMapFromUserRequestBody(req.body);
  var userModel = buildModelFromUserRequestBody(req.body);
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


function newDynamoBD() {
  AWS.config.update({ accessKeyId: awsConfig.SECRET_KEY,
                      secretAccessKey: awsConfig.ACCESS_ID,
                      region:'us-east-1'});      
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
  return dynamodb;
}

function dynamoPostParamsForUserMap(map) {
  var params = { Item: map,
                 ReturnConsumedCapacity: "TOTAL", 
                 TableName: "popsmoke-users"
               };
  return params;
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

function buildAWSMapFromUserRequestBody(requestBody) {
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

function buildModelFromUserRequestBody(requestBody) {
  var outputModel = new Object();
  if ( requestBody.hasOwnProperty("userID") ) {
    outputModel.userID = requestBody["userID"];
  }
  return outputModel;
}

function buildAWSMapFromUser(user) {
  return buildModelFromUserRequestBody(user);
}

function buildModelFromAWSMap(map) {
  console.log("buildModelFromAWSMap");
  console.log("fucking map: " + JSON.stringify(map) );
  var outputModel    = new Object();
  var itemMap        = map.Item;
  var userID         = itemMap.userID.S;
  outputModel.userID = userID;
  return outputModel;
}
