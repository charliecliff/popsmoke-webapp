var exports = module.exports = {};

exports.parameters = {
  USER_ID: "userID"
};

exports.getUserFromAmazonDynamo = function(res, userID) {
  var dynamodb = this.awsDynamoDBInstance();
  var params = { Key: { USER_ID: { S: userID } }, 
                 TableName: "popsmoke-users"};
  dynamodb.getItem(params, function(err, data) {
    if (err) {
      res.status(err.statusCode).send("Problem with AWS");
    } else {
      res.send(data);
    }
  });
}

exports.putUserToAmazonDynamo = function(res, userMap) {
  this.postUserToAmazonDynamo(res, userMap);
}

exports.postUserToAmazonDynamo = function(res, userMap) {
  var dynamodb = this.awsDynamoDBInstance();
  var params = { Item: userMap,
                 ReturnConsumedCapacity: "TOTAL", 
                 TableName: "popsmoke-users"
               };
  dynamodb.putItem(params, function(err, data) {
      if (err) {
        res.status(err.statusCode).send("Problem with AWS");
      } else {
        res.send( JSON.stringify({User: userMap}) );
      }
  });
}

exports.deleteUserFromAmazonDynamo = function(res, userID) {
  console.log("DELETE USER");
  var dynamodb = this.awsDynamoDBInstance();
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

exports.parseUserBody = function(requestBody) {
  var output = new Map();
  if ( requestBody.hasOwnProperty("userID") ) {
    output["userID"] = { S: requestBody["userID"] };
  }
  if ( requestBody.hasOwnProperty("firstName") ) {
    output["firstName"] = { S: requestBody["firstName"] };
  }
  if ( requestBody.hasOwnProperty("lastName") ) {
    output["lastName"] = { S: requestBody["lastName"] };
  }
  return output;
}

exports.awsDynamoDBInstance = function() {
  var AWS = require("aws-sdk");
  AWS.config.update({ accessKeyId: "AKIAIDMIESKUD4F657BQ", 
                      secretAccessKey: "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",
                      region:'us-east-1'});      
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
  return dynamodb;
}
