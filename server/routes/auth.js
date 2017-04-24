var express   = require('express')
var passport  = require('passport');

var router    = express.Router()
var urlParser = bodyParser.urlencoded({ extended: false })


// Car brands page
router.get('/brands', function(req, res) {
  res.send('Audi, BMW, Mercedes')
})

// login
app.post('/signup', urlencodedParser, function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
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

module.exports = router