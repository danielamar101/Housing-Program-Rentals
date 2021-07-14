var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  path = require('path'),
  setup = require('./app/appSetup');
 
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb',() =>{
    console.log("Connection to database successful.")
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

