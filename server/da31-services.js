var da31Pdf = require('./Models/da31Pdf');
var pdfFiller = require('pdffiller');

var express = require('express');
var AWS = require("aws-sdk");

var exports = module.exports = {};

exports.getFileFromAmazonS3 = function(req, res) {
  console.log("getFileFromAmazonS3");
}

exports.postDA31FileToAmazonS3 = function(req, res) {
  generateDA31Document(req, res, "public/DA_31_complete.pdf");
}

exports.deleteFileFromAmazonS3 = function(req, res) {
  console.log("getFileFromAmazonS3");
}

function generateDA31Document(req, res, pdfFilePath) {
  let formatter = new da31Pdf.Da31PdfFormat();
  let formData = formatter.fillOutPdfForm(req.body);
  let pdfTemplatePath = "public/DA_31.pdf";
  let destinationPDF = pdfFilePath;
  pdfFiller.fillForm( pdfTemplatePath, destinationPDF, formData, function(err) {
      if (err){
        res.send(err);
    } else {
      uploadPDFFileToAmazonS3(req, res, destinationPDF);
    }
  });
}

exports.uploadPDFFileToAmazonS3 = function(req, res, pdfFilePath) {
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
  // AWS.config.update({accessKeyId: "AKIAIDMIESKUD4F657BQ", 
  //            secretAccessKey: "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" });
        
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