var da31Pdf = require('./Models/da31Pdf');

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
  console.log("generateDA31Document");
  console.log(req.body);

  // let pdfTemplatePath = "../../public/DA_31.pdf";
  // let formatter = new da31Pdf.Da31PdfFormat();
  // let formData = formatter.fillOutPdfForm(req.body);

  // let pdfFiller = require('pdffiller');
  // let sourcePDF = "public/DA_31.pdf";
  // let destinationPDF = pdfFilePath;
 
  // pdfFiller.fillForm( sourcePDF, destinationPDF, formData, function(err) {
  //     if (err){
  //       res.send(err);
  //   } else {
  //     uploadPDFFileToAmazonS3(req, res, destinationPDF);
  //   }
  // });
}

function uploadPDFFileToAmazonS3(req, res, pdfFilePath) {
  let fs  = require('fs');
    fs.readFile(pdfFilePath, (err, data) => {
      if (!err){
        console.log("LOADING PDF");
        console.log(data);
        uploadPDFDataBufferToAmazonS3(res, data);
      } else {
        console.log("FAILED TO UPLOAD PDF");
        console.log(err);
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