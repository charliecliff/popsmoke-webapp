var da31Services 		= require('./server/da31-services');
var fileServices 		= require('./server/file-services');
var holidayServices = require('./server/holiday-services');
var twilioServices  = require('./server/twilio-services');
var userServices 		= require('./server/user-services');
var config          = require('./server/config');

var express       = require('express');
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var session       = require('express-session')
var passport      = require('passport');

var DynamoDBStore    = require('connect-dynamodb')({session: session});
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var cors 						= require('cors');


var app = express();
app.set('port', process.env.PORT || 5000);


app.use(cookieParser());
app.use(session({
  cookieName: 'session',
  store: new DynamoDBStore(config.dynamoDB),
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(cors()); // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.use(express.static("www")); // Our Ionic app build is in the www folder (kept up-to-date by the Ionic CLI using 'ionic serve')


app.listen(app.get('port'), function () {
	console.log("You're a wizard, Harry. I'm a what? Yes, a wizard, on port", app.get('port'));
});



require('./server/config/passport')(passport); // pass passport for configuration

//------------------------------------------------------------------------------
// The Key to allowing CORS
//------------------------------------------------------------------------------

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', "OPTIONS,GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//------------------------------------------------------------------------------
// AUTH ENDPOINTS
//------------------------------------------------------------------------------

app.post("/auth/resetpasscode/:phoneNumber", function(req, res) {
  console.log("POST - /shortcode");
  phoneNumber = req.params.phoneNumber;
  userServices.getUserWithPhoneNumber(phoneNumber, onGetUser);
  function onGetUser(err, user) {
    if (err) return res.status(500).send(err);
    twilioServices.resetPassCodeForUser(user, onResetPasscode);
  }
  function onResetPasscode(err, user) {
    if (err) return res.status(500).send(err);
    userServices.postUser(user, onPostUser);
  }
  function onPostUser(err, user) {
    if (err) return res.status(500).send(err);
    twilioServices.sendPassCodeMessage(user, onSendPassCodeMesage);
  }
  function onSendPassCodeMesage(err, user) {
    if (err) return res.status(500).send(err);
    return res.status(200).send({message: "Pass Code is on it's way"});
  }
});

app.post('/auth/login', urlencodedParser, function(req, res, next) {
  console.log("POST - /login");
  passport.authenticate('local', function(err, user, info) {
    
    console.log("Err: " + JSON.stringify(err));
    console.log("User: " + JSON.stringify(user));
    console.log("Info: " + JSON.stringify(info));
    
    if (err) {
      return next(err);
    }
    if (! user) {
      return res.send({ success : false, message : 'authentication failed' });
    }
    req.login(user, loginErr => {
      if (loginErr) {
      console.log("login Err: " + JSON.stringify(loginErr) );
      return res.send({ success : false, message : 'authentication failed' });
      }
      return res.send({ success : true, message : 'authentication succeeded' });
    });      
  })(req, res, next);
});

app.post("/auth/logout", function(req, res) {
  console.log("POST - /logout");

});


//------------------------------------------------------------------------------
// HELPER FUNCTIONS
//------------------------------------------------------------------------------

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
// DELETE DL Image /user/driverslicense/:id
// POST DL Image /user/driverslicense/:id
app.post('/upload', function(req, res){
// app.post('/user/driverslicense/:id', function(req, res){
	fileServices.parseFileWithIDFromUploadRequest(req, 
																								req.params.id, 
																								function(err, awsURL) {
  	if (err) {
  		console.log("error reading file:" + err);
  		res.send({"error": err});
  	} else {
  		res.send({"url": awsURL});
  	}
	});
});

// GET Insurance Image /user/proofofinsurance/:id
// POST Insurance Image /user/proofofinsurance/:id
// DELETE Insurance Image /user/proofofinsurance/:id

// POST call to get API Text Code
app.post("/sendText", function(req, res) {
  twilioServices.sendTestMessage();
});

function authenticationMiddleware () {  
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    return res.status(400).send({message: "Invalid Session"});
  }
}

// TODO: Extract these into their files or modules
function handleError(res, reason, message, code) {
	console.log("API Error: " + reason);
	res.status(code || 500).json({"Error": message});
}
