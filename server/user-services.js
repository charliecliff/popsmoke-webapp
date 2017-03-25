

// let userID = req.body["userID"];

var exports = module.exports = {};

exports.parameters = {
  USER_ID: "userID"
};

exports.getUserFromAmazonDynamo = function(res, user) {
  var AWS = require("aws-sdk");       
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var params = {
      Key: { USER_ID: { S: userID } }, 
      TableName: "popsmoke-users"
  };
  dynamodb.getItem(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); 
      } else {
        console.log(data); 
      }
  });
}

exports.putUserToAmazonDynamo = function(res, user) {
  var AWS = require("aws-sdk");       
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var params = {
      Item: user, 
      ReturnConsumedCapacity: "TOTAL", 
      TableName: "popsmoke-users"
  };
  dynamodb.putItem(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
          console.log(data);
      }
  });
}

exports.postUserToAmazonDynamo = function(res, user) {
  var AWS = require("aws-sdk");       
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var params = {
      Item: user, 
      ReturnConsumedCapacity: "TOTAL", 
      TableName: "popsmoke-users"
  };
  dynamodb.putItem(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
          console.log(data);
      }
  });
}

exports.deleteUserFromAmazonDynamo = function(res, userID) {
  var AWS = require("aws-sdk");       
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var params = {
    Key: { USER_ID: { S: userID } }, 
    TableName: "popsmoke-users"
  };
  dynamodb.deleteItem(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });
}