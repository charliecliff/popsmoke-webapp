var awsServices = require('./server/aws-services');
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


  form.on('error', callback);
  form.on('end', function() {
    awsServices.uploadJPEGFileAtPathToAmazonS3(file.path, callback);
  });
  form.parse(req);
}