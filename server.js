
var express = require('express'),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  path = require('path');


var username = 'tankmybank';
var password = 'Illadelph12?';
var hosts = 'iad2-c13-0.mongo.objectrocket.com:54914,iad2-c13-1.mongo.objectrocket.com:54914,iad2-c13-2.mongo.objectrocket.com:54914';
var database = 'natsite-prod';
var options = '?replicaSet=3e22ce01a19f48e981e876585c12fe2f&ssl=true';
//let options = {useMongoClient:true, autoIndex:false, autoReconnect:true, promiseLibrary:global.Promise};

var connectionString = 'mongodb://' + username + ':' + encodeURIComponent(password) + '@' + hosts + '/' + database + options;

// mongoose.connect('mongodb://localhost/Tododb',() =>{
//     console.log("Connection to database successful.")
// }); 

mongoose.connect(connectionString,(err,db) =>{
  if (db) {
    db.close();
  }
  if (err) {
    console.log('Error: ', err);
  } else {
    console.log("Connection to database successful." + mongoose)
  }
  }); 


require('./api/models/appModel');

var app = express();
app.use(express.static('public'));

//Setup default values
var setup = require('./app/appSetup');
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

