var express = require('express'),
  app = express(),
  router = express.Router(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/natModel'), //created model loading here
  bodyParser = require('body-parser'),
  path = require('path');
 
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb',() =>{
    console.log("Connection to database successful.")
}); 


app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/natRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).sendFile(path.join(__dirname,'/views/error.html'));
  //console.log(res);
  console.log('Cannot find page.')
});


app.listen(port, () => {
    console.log("Server is listening on port " + port);
});



console.log('todo list RESTful API server started on: ' + port);
