

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
  var AWS = require("aws-sdk");
  AWS.config.update({ accessKeyId: "AKIAIDMIESKUD4F657BQ", 
                      secretAccessKey: "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",
                      region:'us-east-1'});     
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var params = { Item: userMap,
                 ReturnConsumedCapacity: "TOTAL", 
                 TableName: "popsmoke-users"
               };

  dynamodb.putItem(params, function(err, data) {
      if (err) {
        res.status(err.statusCode).send("Problem with AWS");
      } else {
        console.log(data);
        res.send(data);
      }
  });
}

exports.postUserToAmazonDynamo = function(res, userMap) {
  var AWS = require("aws-sdk");
  AWS.config.update({ accessKeyId: "AKIAIDMIESKUD4F657BQ", 
                      secretAccessKey: "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",
                      region:'us-east-1'});
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  console.log("userMap\n" + JSON.stringify(userMap, null, 4));
  var params = { Item: userMap,
                 ReturnConsumedCapacity: "TOTAL", 
                 TableName: "popsmoke-users"
               };

  console.log("params \n" + JSON.stringify(params, null, 4));

  dynamodb.putItem(params, function(err, data) {
      if (err) {
        res.status(err.statusCode).send("Problem with AWS");
      } else {
        res.send(data);
      }
  });
}

exports.deleteUserFromAmazonDynamo = function(res, userID) {
  var AWS = require("aws-sdk");
  AWS.config.update({ accessKeyId: "AKIAIDMIESKUD4F657BQ", 
                      secretAccessKey: "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",
                      region:'us-east-1'});      
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var params = {
    Key: { USER_ID: { S: userID } }, 
    TableName: "popsmoke-users"
  };
  dynamodb.deleteItem(params, function(err, data) {
    if (err) {
      res.status(err.statusCode).send("Problem with AWS");
    } else {
      console.log(data);
      res.send(data);
    }
  });
}

exports.parseUserBody = function(data) {
  console.log("parseUserBody");

  var output = new Map();

  if ("userID" in data) {
    output.set("userID", { S: data["userID"] });
  }
  if ("firstName" in data) {
    output.set("firstName", { S: data["firstName"] });
  }
  if ("lastName" in data) {
    output.set("lastName", { S: data["lastName"] });
  }
  console.log("userMap\n" + JSON.stringify(output, null, 4) );
  return output;
}
