"use strict";
var mongoose = require("mongoose");
var User = mongoose.model("Users");
var Invite = mongoose.model("Invite");
var bcrypt = require("bcrypt");
var path = require("path");
const { send } = require("process");
const session = require('express-session');

exports.list_all_users = function (req, res) {
  User.find({}, function (err, user) {
    if (err) res.send(err);
    console.log("Error");

    //res.json(user);

    res.render("test/output_users", {
      allUsers: user,
    });
  });
};

exports.create_invite_code = function (req, res) {};

exports.view_login = function (req, res) {
  if(req.session.loggedIn){
    res.render("admin/portal");
  }else{
  res.render("user/login");
  }
};

exports.auth = function (req, res) {
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
              req.session.username = aUsername;
              console.log("Valid user. Logging in.");
              res.render("admin/portal", {
                user: req.session.username,
                loggedIn: req.session.loggedIn,
              });
            } else {
              res.send("Incorrect password");
              console.log("Incorrect password");
            }
          });
        } else {
          res.send("Error: Incorrect Username and/or password");
          console.log("Invalid credentials.");
        }
      }
    );
  } else {
    res.send("Please enter Username and Password!");
    rees.end();
  }
};

exports.view_signup = function (req, res) {
  res.render("user/signup");
};

exports.signup = function (req, res) {
  console.log("routed to signup page.");
  console.log(`Email: ${req.body.email}`);

  var canProceed = false;

  Invite.findOne(
    { invite_code: req.body.invite_code },
    "invite_code",
    function (err, results) {
      if (err) {
        res.send(err);
        console.log("Error finding invite code");
      }

      //This means there is a correct invite code
      if (results != undefined && Object.keys(results).length > 0) {
        var user = new User({
          email: req.body.email,
          password: req.body.password,
          passwerd: req.body.passwerd,
        });

        if (user.password != user.passwerd) {
          console.log("Passwords don't match!");
          res.redirect("user/signup");
          res.end();
        } else {
          console.log("passwords are the same");
        }

        bcrypt.hash(user.password, 10, function (err, hash) {
          if (err) {
            return next(err);
          }
          user.password = hash;
          user.passwerd = hash;
          user
            .save()
            .then(() => {
              console.log("Successfully created a new User");
              console.log("Routing to success page");

              res.render("user/success", {
                name: "daniel",
                da_user: user.email,
              });
            })
            .catch((error) => {
              // you can send an error code here
              console.log("Error creating new user", error);
              res.send(err);
              res.end();
            });
        });
      } else {
        res.send("Could not find invite code");
      }
    }
  );
};

exports.read_a_user = function (req, res) {
  User.findById(req.params.userId, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.update_a_user = function (req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    req.body,
    { new: true },
    function (err, user) {
      if (err) res.send(err);
      res.json(user);
    }
  );
};

exports.delete_a_user = function (req, res) {
  User.remove(
    {
      _id: req.params.userId,
    },
    function (err, user) {
      if (err) res.send(err);
      res.json({ message: "User successfully deleted" });
    }
  );
};

exports.view_admin_portal = function (req, res) {
  res.render("admin/portal", {
    user: req.session.username,
    loggedIn: req.session.loggedIn,
  });
};
