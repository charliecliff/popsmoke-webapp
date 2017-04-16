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
  form.uploadDir = path.join(__dirname, '/uploads');

  
  let fileName = form.name;
  console.log("Uploaded File Name:" + fileName);

  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });
  form.on('error', function(err) {    
    console.log('An error has occured: \n' + err);
    callback(err);
  });
  form.on('end', function() {
    awsServices.uploadJPEGFileAtPathToAmazonS3(file.path, callback);
  });
  form.parse(req);
}