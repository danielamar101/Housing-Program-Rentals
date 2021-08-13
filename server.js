var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  path = require('path'),
  setup = require('./app/appSetup');
 
  


var username = 'tankmybank';
var password = 'Illadelph12?';
var hosts = 'iad2-c12-2.mongo.objectrocket.com:54917,iad2-c12-1.mongo.objectrocket.com:54917,iad2-c12-0.mongo.objectrocket.com:54917';
var database = 'natsite-prod';
var options = '?replicaSet=4db59e42f2474892959d444975be539e';
var connectionString = 'mongodb://' + username + ':' + encodeURIComponent(password) + '@' + hosts + '/' + database + options;
console.log(connectionString);
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(connectionString,(err,db) =>{
  if (db) {
    db.close();
  }
  if (err) {
    console.log('Error: ', err);
  } else {
    console.log("Connection to database successful.")
  }
  }); 

app.use(express.static('public'));

//Setup default values
setup(app)

//Route importing, calls central router which delegates to granular route files
var central_router = require('./api/routes/centralRoutes'); //importing route
central_router(app); //register the route

//Error Handling
app.use(function(req, res) {
  res.status(404).sendFile(path.join(__dirname,'/views/error.html'));
  //console.log(res);
  console.log('Cannot find page.')
});

//Start server
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});

