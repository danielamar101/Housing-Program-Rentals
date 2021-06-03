var express = require('express'),
  app = express(),
  router = express.Router(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/appModel'), //created model loading here
  bodyParser = require('body-parser'),
  path = require('path'),
  expressEjsLayout = require('express-ejs-layouts')
  appSetup = require('app/appSetup');
 
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb',() =>{
    console.log("Connection to database successful.")
}); 

//EJS
app.set('view engine','ejs');
//app.use(expressEjsLayout);
//app.set('views', path.join(__dirname, 'views'));

//Bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//Default opts
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})


//Use public resources
app.use(express.static(path.join(__dirname,'public')));
//app.use(express.static(path.join(__dirname,'views')));

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




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

