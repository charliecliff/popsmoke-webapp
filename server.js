var da31Services 		= require('./server/da31-services');
var fileServices 		= require('./server/file-services');
var holidayServices = require('./server/holiday-services');
var userServices 		= require('./server/user-services');
var express 				= require('express');
var bodyParser 			= require('body-parser');
var cors 						= require('cors');
var app 						= express();


var mongodb = require('mongodb'),
mongoClient = mongodb.MongoClient,
ObjectID = mongodb.ObjectID, // Used in API endpoints
db; // We'll initialize connection below

app.use('/public', express.static(__dirname + '/public'));

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
  res.header('Access-Control-Allow-Methods', "OPTIONS,GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// User Endpoints
app.get("/user/:id", function(req, res) {
	userServices.getUserFromAmazonDynamo(res, req.params.id);
});
app.put("/user/:id", function(req, res) {
	userServices.putUserToAmazonDynamo(req, res);
});
app.post("/user/:id", function(req, res) {
	userServices.postUserToAmazonDynamo(req, res);
});
app.delete("/user/:id", function(req, res) {
	userServices.deleteUserFromAmazonDynamo(res, req.params.id);
});
// Holiday Endpoints
app.get("/holidays", function(req, res) {
	holidayServices.getHolidaysFromAmazonDynamo(req, res);
});
// Packet Endpoints
// GET packet/:packetid
// POST packet/:packetid
// PUT packet/:packetid

// DA31 Endpoints
// GET packet/:packetid/da31 -> ? Does this format work?
// GET packet/:id/da31/:file
app.post("/packet/:id/da31/create", function(req, res) {
	da31Services.postDA31FileToAmazonS3(req, res);
});

// GET DL Image /user/driverslicense/:id
// POST DL Image /user/driverslicense/:id
// DELETE DL Image /user/driverslicense/:id
// GET Insurance Image /user/proofofinsurance/:id
// POST Insurance Image /user/proofofinsurance/:id
// DELETE Insurance Image /user/proofofinsurance/:id

app.post('/upload', function(req, res){
	console.log("/upload");

	fileServices.parseFileWithIDFromUploadRequest(req, req.params.id, function(err, awsURL) {
		console.log("Callback in Upload URL");
  	if (err) {
  		res.send(err);
  	} else {
  		res.send(awsURL);
  	}
	});

});

// app.post('/user/driverslicense/:id', function(req, res){
// 	console.log("/user/driverslicense");
// 	fileServices.parseFileWithIDFromUploadRequest(req, req.params.id, (error, awsURL) {
//   	if (err) {
//   		res.send(err);
//   	} else {
//   		res.send(awsURL);
//   	}
// 	});
// });

// TODO: Extract these into their files or modules
function handleError(res, reason, message, code) {
	console.log("API Error: " + reason);
	res.status(code || 500).json({"Error": message});
}
