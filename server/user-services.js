

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
        console.log("error with AWS\n" + err);
        res.status(err.statusCode).send("Problem with AWS");
      } else {
        console.log("sucess!\n" + data);
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

exports.parseUserBody = function(requestBody) {
  console.log("parseUserBody");

  var output = new Map();
  if ( requestBody.hasOwnProperty("userID") ) {
    output["userID"] = { S: requestBody["userID"] };
  }
  // if ( requestBody.hasOwnProperty("firstName") ) {
  //   output["firstName"] { S: requestBody["firstName"] });
  // }
  // if ( requestBody.hasOwnProperty("lastName") ) {
  //   output.set("lastName", { S: requestBody["lastName"] });
  // }
  output["test"] = "fuck";
  console.log("parseUserBody -- userMap\n" + JSON.stringify(output) );
  return output;
}
