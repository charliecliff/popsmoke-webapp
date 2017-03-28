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
      res.status(err.statusCode).send("Problem with AWS");
    } else {
      var holidays = self.buildArrayFromAWSMap(data);
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
  for (var i = itemArray.length - 1; i >= 0; i--) {
    
    var holidayMap = itemArray[i];
    var branch = holidayMap.governmentBranch.S;
    var startDateString = holidayMap.startDateTime.S;
    var endDateString = holidayMap.endDateTime.S;
    var name = holidayMap.name.S;
    var photoURL = holidayMap.photoURL.S;
    
    var holidayModel = new Object();
    holidayModel.name = name;
    holidayModel.branch = branch;
    holidayModel.startDate = startDateString;
    holidayModel.endDate = endDateString;
    holidayModel.photoURL = photoURL;

    outputArray.push(holidayModel);
  }
  return outputArray;
}