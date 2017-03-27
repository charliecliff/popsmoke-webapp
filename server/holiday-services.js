var express = require('express');
var AWS = require("aws-sdk");

var exports = module.exports = {};

exports.getHolidaysFromAmazonDynamo = function(req, res) {
  console.log("getHolidaysFromAmazonDynamo");

  AWS.config.update({ accessKeyId: "AKIAIDMIESKUD4F657BQ", 
                      secretAccessKey: "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",
                      region:'us-east-1'});      
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var expressionValues = self.buildAWSQueryFromHolidaysRequestBody(req.body);
  var params = {
    TableName : "popsmoke-holidays",
    KeyConditionExpression: "governmentBranch = :branch and startDateTime between :curentDate and :nextDate",
    ExpressionAttributeValues: expressionValues
  };

  console.log( "params\n" + JSON.stringify(params));

  dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        
    } else {
        console.log(JSON.stringify("data\n" + data));
        console.log("Query succeeded.");

    }
  });
}

exports.buildAWSQueryFromHolidaysRequestBody = function(requestBody) {
  var currentDateTime = new Date();
  java.text.SimpleDateFormat df = new java.text.SimpleDateFormat("yyyy-MM-dd");
  String startDateString = df.format(currentDateTime);

  var outputMap = new Map();
  outputMap[":branch"] = { S: requestBody["branch"] };
  outputMap[":curentDate"] = { S: startDateString };
  outputMap[":nextDate"] = { S: requestBody["stopDate"] };
  return outputMap;
}