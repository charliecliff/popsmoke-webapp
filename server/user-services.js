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







































//------------------------------------------------------------------------------
// PUBlIC INTERFACE
//------------------------------------------------------------------------------
exports.getUserWithPhoneNumber = function(phoneNumber, callback) {
  console.log("getUserWithPhoneNumber");
  var dynamodb = awsService.newDynamoBD();
  var params   = awsService.userQueryParams(phoneNumber);
  dynamodb.getItem(params, function(err, data) {
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

exports.postUser = function(user, callback) {
  console.log("postUserToDatabase");
  insertUserIntoDatabase(user, callback);
}

exports.deleteUser = function(user, callback) {
  console.log("deleteUser");

}

// exports.resetUserPasscode = function(user, callback) {
//   console.log("resetUserPasscode");
//   user["password"] = newPassCode();
//   callback(null, user);
// }
//------------------------------------------------------------------------------
// HELPER FUNCTIONS
//------------------------------------------------------------------------------
function registerUserWithPhoneNumber(phoneNumber, callback) {
  var user = createUserWithPhoneNumber(phoneNumber);
  insertUserIntoDatabase(user, callback);
}

function createUserWithPhoneNumber(phoneNumber) {
  var user = new Object();
  user.userID = phoneNumber;
  return user;
}

function insertUserIntoDatabase(user, callback) {
  var dynamodb = awsService.newDynamoBD();
  var params   = awsService.dynamoPostParamsForUser(user);

  console.log("params: " + JSON.stringify(params));

  dynamodb.putItem(params, callback);
}

function newPassCode() {
  console.log("newTextMessageCode");
  return "444444";
}

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------










































exports.getUserFromAmazonDynamoWithPhoneNumber = function(phoneNumber, callback) {
  console.log("getUserFromAmazonDynamo");
  console.log(phoneNumber);

  var dynamodb = awsService.newDynamoBD();

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
      user = createUserWithPhoneNumber(phoneNumber);
    } else {
      user = buildModelFromAWSMap(data);
    }
    callback(null, user);
  });
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

/**----------------
----- AWS MAP -----
-----------------*/


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
