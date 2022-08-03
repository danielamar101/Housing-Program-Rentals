const aws = require('aws-sdk'),
  express = require("express"),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  path = require("path");


//let options = {useMongoClient:true, autoIndex:false, autoReconnect:true, promiseLibrary:global.Promise};

var connectionString = process.env.MONGODB_URI || "mongodb://data/db";

async function main() {

  try {
    const con = await mongoose.connect(connectionString);

    //Initialize models
    require("./api/models/appModel");

    var app = express();
    app.use(express.static("public"));

    //Setup default values
    var setup = require("./app/appSetup");
    setup(app);

    //Route importing, calls central router which delegates to granular route files
    var central_router = require("./api/routes/centralRoutes"); //importing route
    central_router(app); //register the route

    //Error Handling
    app.use(function (req, res) {
      res.status(404).sendFile(path.join(__dirname, "/views/error.html"));
      console.log("Cannot find page.");
    });

    //Start server
    app.listen(port, () => {
      console.log("Server is listening on port " + port);
    });
  } catch (error) {
    console.log("Error during server opening: " + error);
  }
}

main();


