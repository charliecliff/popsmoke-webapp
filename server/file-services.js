var awsServices = require('./aws-services');
var formidable  = require('formidable');
var fs          = require('fs');
var express     = require('express');
var path        = require('path');

var exports = module.exports = {};

exports.parseFileWithIDFromUploadRequest = function(req, id, callback) {
  console.log("parseFileWithIDFromUploadRequest");

  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = 'public/uploads';

  form.on('file', function(field, file) {
    console.log("on file");
    awsServices.uploadJPEGFileAtPathToAmazonS3(file.path, callback);
  });
  form.on('error', function(err) {    
    callback(err);
  });
  form.parse(req);
}

// TODO: Function to delete Files