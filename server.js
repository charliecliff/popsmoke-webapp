var da31Pdf = require('./da31Pdf');

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

// The Key to allowing CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post("/api/da31", function(req, res) {
	let pdfTemplatePath = "../../public/DA_31.pdf"; // <-- TODO: Make this route a constant
	let formatter = da31Pdf.Da31PdfFormat();
	let formData = formatter.fillOutPdfForm(req.body);
	let fillPdf = require("fill-pdf");
	fillPdf.generatePdf(formData, pdfTemplatePath, function(err, output) {
    	if ( !err ) {
	  		postPDFFileToAmazonS3(res, output);
    	} else {
    		res.send(err);
    	}
  	});
});

// TODO: Extract these into their files or modules
function handleError(res, reason, message, code) {
	console.log("API Error: " + reason);
	res.status(code || 500).json({"Error": message});
}

function postPDFFileToAmazonS3(res, pdfDataBuffer) {
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
			res.send("https://s3-us-west-2.amazonaws.com/popsmoke/myarchive.pdf");
		}
	});
}