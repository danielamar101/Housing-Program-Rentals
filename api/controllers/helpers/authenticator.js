/*Middleeware that authenticates a user before redirecting to a restricted
page */
var mongoose = require("mongoose");
var User = mongoose.model("Users");
var bcrypt = require("bcrypt");
var session = require("express-session");

exports.authenticate = function (req, res, next) {
  var aUsername = req.body.username;
  var aPassword = req.body.password;

  if (aUsername && aPassword) {
    User.findOne(
      { email: aUsername },
      "email password",
      function (error, results, fields) {
        if (results != undefined && Object.keys(results).length > 0) {
          bcrypt.compare(aPassword, results.password, function (err, result) {
            if (result) {
              req.session.loggedin = true;
              res.locals.username = aUsername;
              console.log("Valid user. Redirecting to next middleware.");
              //Continue to next callback
              next();
            } else {
              res.send("Incorrect password");
              console.log("Incorrect password");
              res.end();
            }
          });
        } else {
          res.send("Error: Incorrect Username and/or password");
          console.log("Invalid credentials.");
          res.end();
        }
      }
    );
  } else {
    res.send("Please enter Username and Password!");
    rees.end();
  }
};
