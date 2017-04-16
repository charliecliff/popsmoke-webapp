
var express = require('express');
var AWS = require("aws-sdk");

var exports = module.exports = {};

export function uploadJPEGDataBufferToAmazonS3(res, dataBuffer) {
  
  var params = {
    Bucket: "popsmoke-images", /* pull these into a configuration file */
    Key: "myarchive.jpeg",
    ACL: "public-read",
    ContentDisposition: "inline",
    ContentType: "application/image/jpeg",
    Body: dataBuffer
  };

  s3 = new AWS.S3({apiVersion: "2006-03-01"});
  s3.putObject(params, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send({"url": "https://s3-us-west-2.amazonaws.com/popsmokeimages/myarchive.jpeg"}); //TODO: Pull this into a Configuration File
    }
  });
}