var express = require('express');
var AWS = require("aws-sdk");

var exports = module.exports = {};

// -----------------------------------------------------------------------------
// PDF Files Buckets
// -----------------------------------------------------------------------------
exports.uploadPDFFileAtPathToAmazonS3 = function(req, res, pdfFilePath) {
  let fs  = require('fs');
  fs.readFile(pdfFilePath, (err, data) => {
    if (!err){
      uploadPDFDataBufferToAmazonS3(res, data);
    } else {
      res.err = err;
    }  
  });
}

function uploadPDFDataBufferToAmazonS3(res, pdfDataBuffer) {
  var AWS = require("aws-sdk");        
  var params = {
    Bucket: "popsmoke", /* pull these into a configuration file */
    Key: "myarchive.pdf",
    ACL: "public-read",
    ContentDisposition: "inline",
    ContentType: "application/pdf",
    Body: pdfDataBuffer
  };

  s3 = new AWS.S3({apiVersion: "2006-03-01"});
  s3.putObject(params, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send({"url": "https://s3-us-west-2.amazonaws.com/popsmoke/myarchive.pdf"}); //TODO: Pull this into a Configuration File
    }
  });
}

// -----------------------------------------------------------------------------
// JPEG Files Buckets
// -----------------------------------------------------------------------------
exports.uploadJPEGFileAtPathToAmazonS3 = function (localJpegFilePath, 
                                                   awsJPEGFileName, 
                                                   callback) {
  console.log("uploadJPEGFileAtPathToAmazonS3");
  let fs  = require('fs');
  fs.readFile(localJpegFilePath, (err, dataBuffer) => {
    if (err){
      callback(err);
    } else {
      uploadJPEGDataBufferToAmazonS3(awsJPEGFileName, dataBuffer, callback);
    }
  });
}

function uploadJPEGDataBufferToAmazonS3(fileName, dataBuffer, callback) {
  console.log("uploadJPEGDataBufferToAmazonS3");
  let params = awsJPEGParams(fileName, dataBuffer);
  s3 = new AWS.S3({apiVersion: "2006-03-01"});
  s3.putObject(params, function(err, data) {
    if (err) {
      callback(err);
    } else {
      let fileURL = awsJPEGUrl(fileName);
      callback(null, fileURL);
    }
  });
}

function awsJPEGUrl(fileName) {
  console.log("awsJPEGUrl");
  return "https://s3-us-west-2.amazonaws.com/popsmoke/" + fileName;
}

function awsJPEGParams(fileName, dataBuffer) {
  console.log("awsJPEGParams");
  return {
    Bucket: "popsmoke", /* pull these into a configuration file */
    Key: fileName,
    ACL: "public-read",
    ContentDisposition: "inline",
    ContentType: "application/image/jpeg",
    Body: dataBuffer
  };
}

