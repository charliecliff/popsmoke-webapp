//server.js (todo-ionic2-heroku/server.js)
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var mongodb = require('mongodb'),
mongoClient = mongodb.MongoClient,
ObjectID = mongodb.ObjectID, // Used in API endpoints
db; // We'll initialize connection below

app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080);
app.use(cors()); // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.use(express.static("www")); // Our Ionic app build is in the www folder (kept up-to-date by the Ionic CLI using 'ionic serve')

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://heroku_qh0mdwmz:tnk9ln40ct6k7ncnlle3tf8fte@ds121980.mlab.com:21980/heroku_qh0mdwmz';

// Initialize database connection and then start the server.
mongoClient.connect(MONGODB_URI, function (err, database) {
	if (err) {
		process.exit(1);
	}

	db = database; // Our database object from mLab

	console.log("Database connection ready");

	// Initialize the app.
	app.listen(app.get('port'), function () {
		console.log("You're a wizard, Harry. I'm a what? Yes, a wizard, on port", app.get('port'));
	});
});

app.post("/api/da31", function(req, res) {
	var fillPdf = require("fill-pdf");
	var pdfTemplatePath = "../../public/DA_31.pdf"; // <-- TODO: Make this route a constant
	
	// <-- TODO: Build out the JSON Field Arguments
	var formDate = { FieldName: "Text to put into form field" }; 

	fillPdf.generatePdf(formDate, pdfTemplatePath, function(err, output) {
    	
    	if ( !err ) {
	  		console.log("Start AWS Upload");
    		
	  		this.putPDFFileToAmazonS3(res, output);

      		res.type("application/pdf");
      		res.send(output);
    	} else {
    		res.send(err);
    	}
  	});
});

// Error handler for the api
function handleError(res, reason, message, code) {
	console.log("API Error: " + reason);
	res.status(code || 500).json({"Error": message});
}

function putPDFFileToAmazonS3(res, pdfDataBuffer) {
	var AWS = require("aws-sdk");
	// AWS.config.update({accessKeyId: "AKIAIDMIESKUD4F657BQ", 
	//  				  secretAccessKey: "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" });
    		
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
			console.log(data); // Return AWS File URL
		}
	});
}