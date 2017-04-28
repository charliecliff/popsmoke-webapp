var pdfFiller = require('pdffiller');

var express = require('express');

var exports = module.exports = {};

exports.generateDocument = function(req, res, pdfFilePath) {

  let fs = require('fs'),
  PDFParser = require("pdf2json");
 
  let pdfParser = new PDFParser();
 
  pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
  pdfParser.on("pdfParser_dataReady", pdfData => {
    console.log("PARSE PDF FILE:");
    console.log(JSON.stringify(pdfData));
  });
 
  pdfParser.loadPDF("public/TRIPS.pdf"); 

}
