"use strict";
var mongoose = require("mongoose");
var User = require('../models/appModel').userModel;
var Invite = require('../models/appModel').inviteModel;
var bcrypt = require("bcrypt");



//Debug - remove later
exports.list_all_users = function (req, res) {
  User.find({}, function (err, user) {
    if (err) res.send(err);
    console.log("Error");

    res.render("test/output_users", {
      allUsers: user,
    });
  });
};

exports.view_logout = function(req,res){

  res.render("user/logout",{
    da_user: "Penis"
  });

}

exports.logout = function(req,res){


  req.session.destroy((err)=>{
    console.log("Error destroying session.");
    res.sendStatus(501);
  });
  console.log(req.session);
  res.redirect("/view_logout");
}
//GET - See signup page
exports.view_signup = function (req, res) {
  res.render("user/signup");
};



//GET - See login page
exports.view_login = function (req, res) {

  res.render("user/login");
  
};
exports.view_portal = function (req, res){

  res.render("admin/portal");
}
// function findUser({aUsername, aPassword}, queryString, callback){

// }
//POST - after authenticating
exports.portal = function (req, res) {
  req.session.loggedIn = true;
  req.session.username = res.locals.username;
  console.log(req.session);
  res.redirect('/view_portal');
};

//POST - Signup code
exports.signup = function (req, res) {
  console.log("routed to signup post");
  console.log(`Email: ${req.body.email}`);

  const anEmail = req.body.email;
  const aPassword = req.body.password;
  const aPasswerd = req.body.passwerd;
  const aCode = req.body.invite_code;

  //Query invite collection to see if invite key is legit
  Invite.findOne(
    { invite_code: aCode },
    "invite_code",
    function (err, results) {
      if (err) {
        res.send(err);
        console.log("Error finding invite code");
      }

      //This means there is a correct invite code
      if (results != undefined && Object.keys(results).length > 0) {

        if (aPassword != aPasswerd) {
          console.log("Passwords don't match!");
          res.redirect("user/signup");
          res.end();
        }

        //Encrypts password
        bcrypt.hash(aPassword, 10, function (err, hash) {
          if (err) {
            return next(err);
          }

          var user = new User({
            email: anEmail,
            password: hash,
          });

          user
            .save()
            .then(() => {
              console.log("Successfully created a new User");
              console.log("Routing to success page");

              //TODO: Route to admin portal ?
              res.render("user/success", {
                name: "daniel",
                da_user: user.email,
              });
            })
            .catch((error) => {
              console.log("Error creating new user", error);
              res.render('user/error');
            });
        });
      } else {
        res.send("Could not find invite code");
      }
    }
  );
};

//Implement later, may be useful
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
