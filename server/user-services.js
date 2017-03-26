

// let userID = req.body["userID"];

var exports = module.exports = {};

exports.parameters = {
  USER_ID: "userID"
};

exports.getUserFromAmazonDynamo = function(res, userID) {
  var AWS = require("aws-sdk");
  AWS.config.update({ accessKeyId: "AKIAIDMIESKUD4F657BQ", 
                      secretAccessKey: "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",
                      region:'us-east-1'});   
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var params = {
      Key: { USER_ID: { S: userID } }, 
      TableName: "popsmoke-users"
  };
  dynamodb.getItem(params, function(err, data) {
      if (err) {
        console.log(err.statusCode);
        res.status(404).send("Problem with AWS");
      } else {
        res.send(data);
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
        res.send(err);
      } else {
        console.log(data);
        res.send(data);
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
        res.send(err);
      } else {
        console.log(data);
        res.send(data);
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
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
}