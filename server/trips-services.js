var da31Pdf = require('./Models/da31Pdf');
var pdfFiller = require('pdffiller');

var express = require('express');

var exports = module.exports = {};

function generateDocument(req, res, pdfFilePath) {
  let formatter = new da31Pdf.Da31PdfFormat();
  let formData = formatter.fillOutPdfForm(req.body);
  let pdfTemplatePath = "public/TRIPS.pdf";
  let destinationPDF = pdfFilePath;

  pdfFiller.generateFieldJson(dest2PDF, null, function(err, fdfData) {

    console.log(fdfData);
    
    fdfData.length.should.equal(0);
    done();
  });
}
