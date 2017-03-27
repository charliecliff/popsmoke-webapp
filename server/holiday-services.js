var express = require('express');
var AWS = require("aws-sdk");

var exports = module.exports = {};

exports.getHolidaysFromAmazonDynamo = function(req, res) {
  console.log("getHolidaysFromAmazonDynamo");

  AWS.config.update({ accessKeyId: "AKIAIDMIESKUD4F657BQ", 
                      secretAccessKey: "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",
                      region:'us-east-1'});      
  var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});


var params = {
    TableName : "popsmoke-holidays",
    KeyConditionExpression: "startDate between :curentDate and :nextDate",
    ExpressionAttributeValues: {
        ":curentDate":{N: "2010-01-01"},
        ":nextDate":{N: "2015-01-01"}
    }
};

  console.log( "params\n" + JSON.stringify(params));

dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log(JSON.stringify("data\n" + data));

        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title);
        });
    }
});
}





  // var params = {
  //     Key: { "userID": { S: userID } }, 
  //     TableName: "popsmoke-holidays"
  // };
  // dynamodb.getItem(params, function(err, data) {
  //     if (err) {
  //       console.log(err, err.stack); 
  //     } else {
  //       console.log(data); 
  //     }
  // });



// exports.getHolidayFromAmazonDynamo = function(req, res) {
//   AWS.config.update({ accessKeyId: "AKIAIDMIESKUD4F657BQ", 
//                       secretAccessKey: "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",
//                       region:'us-east-1'}); 
//   var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

//   var params = {
//       Item: user, 
//       ReturnConsumedCapacity: "TOTAL", 
//       TableName: "popsmoke-holidays"
//   };
//   dynamodb.putItem(params, function(err, data) {
//       if (err) {
//         console.log(err, err.stack);
//       } else {
//           console.log(data);
//       }
//   });
// }
