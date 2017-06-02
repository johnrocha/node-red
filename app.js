/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var watson = require('watson-developer-cloud');

var nlc = watson.natural_language_classifier({
   username: 'd96a53b2-9b8d-4dee-9638-c9d170841a64',
   password: 'PCcAGP2uIWey',
   version: 'v1'
 });

 nlc.classify({
       text: 'How hot will it be today?',
       classifier_id: '1c182fx82-nlc-337' },
     function(err, response) {
       if (err)
         console.log('error:', err);
       else
         console.log(JSON.stringify(response, null, 2));
     });


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
