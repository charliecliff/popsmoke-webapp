var pdfFiller = require('pdffiller');

var express = require('express');

var exports = module.exports = {};

exports.generateDocument = function(req, res, pdfFilePath) {
  let pdfTemplatePath = "public/TRIPS.pdf";
  let destinationPDF = pdfFilePath;

  pdfFiller.generateFieldJson(destinationPDF, null, function(err, fdfData) {

    console.log(fdfData);

    fdfData.length.should.equal(0);
    done();
  });
}
