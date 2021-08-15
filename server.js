var express = require("express"),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  path = require("path");

const username = "banktanker";
const password = "dESAPyzzvGRIEgiX";
const hosts = "cluster0.zj257.mongodb.net";
const database = "natsite";
const options = "?retryWrites=true&w=majority";
const dev = false;

//let options = {useMongoClient:true, autoIndex:false, autoReconnect:true, promiseLibrary:global.Promise};
//'mongodb://' + username + ':' + encodeURIComponent(password) + '@' + hosts + '/' + database + options;

var connectionString = process.env.MONGODB_URI || "mongodb://localhost/Tododb";

async function main() {
  //const connectionString = 'mongodb+srv://' + username + ':' + encodeURIComponent(password) + '@' + hosts + '/' + database + options;
  // const client = new MongoClient(connectionString);

  try {
    const con = await mongoose.connect(connectionString);
    var names = [];

    console.log("Got here");

    const InviteSchema = new Schema({
      invite_code: { type: String, required: true },
    });

    mongoose.model("Invite", InviteSchema);

    const Invite = mongoose.model("Invite");

    var oneThing = new Invite({ invite_code: "test" })
      .save()
      .then(() => {
        console.log("Saved listing successfully");
      })
      .catch((error) => {
        console.log("Error saving listing..");
      });

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
      //console.log(res);
      console.log("Cannot find page.");
    });

    //Start server
    app.listen(port, () => {
      console.log("Server is listening on port " + port);
    });
    console.log(con);
  } catch (error) {
    console.log("Connection error " + error);
  }
}

main();


