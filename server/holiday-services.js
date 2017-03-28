var express = require('express');
var AWS = require("aws-sdk");
var dateFormat = require('dateformat');

var exports = module.exports = {};

exports.getHolidaysFromAmazonDynamo = function(req, res) {
  console.log("getHolidaysFromAmazonDynamo");
  var self = this;
  AWS.config.update({ accessKeyId: "AKIAIDMIESKUD4F657BQ", 
                      secretAccessKey: "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",
                      region:'us-east-1'});      
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
  var expressionValues = this.buildAWSQueryFromHolidaysRequest(req);
  var params = {
    TableName : "popsmoke-holidays",
    KeyConditionExpression: "governmentBranch = :branch and startDateTime between :curentDate and :nextDate",
    ExpressionAttributeValues: expressionValues
  };
  dynamodb.query(params, function(err, data) {
    if (err) {
      console.error("Get Holidays Error:", JSON.stringify(err));
      res.status(err.statusCode).send("Problem with AWS");
    } else {

      var holidays = self.buildArrayFromAWSMap(data);
      console.log(JSON.stringify("holidays\n" + holidays));
      console.log("Query succeeded.");
      res.send( {holidays: holidays} );
    }
  });
}

exports.buildAWSQueryFromHolidaysRequest = function(req) {
  var now = new Date();
  var startDateString = dateFormat(now, "yyyy-mm-dd");
  var outputMap = new Map();
  outputMap[":branch"] = { S: req.query.branch };
  outputMap[":curentDate"] = { S: startDateString };
  outputMap[":nextDate"] = { S: req.query.thruDate };
  return outputMap;
}

exports.buildArrayFromAWSMap = function(awsMap) {
  var outputArray = new Array();
  var itemArray = awsMap["Items"];

  console.log("itemArray: " + JSON.stringify(itemArray));

  for (var i = itemArray.length - 1; i >= 0; i--) {
    var holidayMap = itemArray[i];
    var userID = holidayMap.startDateTime.S;
    var branch = holidayMap.governmentBranch.S;
    var holidayModel = new Object();
    holidayModel.userID = userID;
    holidayModel.branch = branch;
    outputArray.push(holidayModel);
  }
  return outputArray;
}