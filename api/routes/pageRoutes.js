"use strict";
module.exports = function (app) {
  var viewController = require("../controllers/ViewController");
  const multer = require("multer");
  const path = require("path");
  var checkSignIn = require("../controllers/helpers/checkSignIn");
  const router = require('express').Router({mergeParams:true});

  //Viewing routes only
  app.route("/").get(viewController.showHome);
  app.route("/home").get(viewController.showHome);

  app.route("/listings").get(viewController.showListings);
  app.route("/listing/:id").get(viewController.show_a_listing);

  app.route("/contact").get(viewController.showContactUs);
  app.route("/about").get(viewController.showAbout);

  app.route("/view_portal").get(checkSignIn.checkSignIn, viewController.view_admin_portal);
  //Non viewing routes
  
  app.route("/view_logout").get(viewController.view_logout);

  app.route("/delete_all_listings").get(checkSignIn.checkSignIn, viewController.deleteAllListings);

  app.route("/delete_listings").get(checkSignIn.checkSignIn, viewController.view_delete_listings);
  app.route("/edit_listings").get(checkSignIn.checkSignIn,viewController.view_edit_listings);
  //Listing creation code



  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../public/images/"));
    },
    // TODO: set some limits: https://github.com/expressjs/multer#limits

    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
  });

  var upload = multer({ storage: storage });

  app
    .route("/create_listing")
    .get(viewController.showCreateListing)
    .post(upload.array("img", 10), viewController.createListing);

  ////// End listing creation

};
