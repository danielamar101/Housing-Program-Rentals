"use strict";
var mongoose = require("mongoose");
var Listing = mongoose.model("Listings");
var path = require("path");
const fs = require("fs");

var mascots = [
  { name: "Sammy", organization: "DigitalOcean", birth_year: 2012 },
  { name: "Tux", organization: "Linux", birth_year: 1996 },
  { name: "Moby Dock", organization: "Docker", birth_year: 2013 },
];
var tagline =
  "No programming concept is complete without a cute animal mascot.";

exports.showHome = function (req, res) {
  console.log("Routed to home page.");
  
  res.render("pages/index", {
    mascots: mascots,
    tagline: tagline,
  });
  //res.render('pages/index')
};

exports.showAbout = function (req, res) {
  console.log("Routed to about page.");
  res.render("pages/about");
};

exports.deleteAllListings = function (req, res) {
  Listing.deleteMany({})
    .then(function () {
      console.log("DELETED ALL LISTINGS!");
    })
    .catch(function (error) {
      console.log("ERROR DELETING ALL LISTINGS!");
    });
    res.render("pages/index", {
      mascots: mascots,
      tagline: tagline,
    });
};

//Shows created listings
exports.showListings = function (req, res) {
  Listing.find({}, function (err, listing) {
    if (err) res.send(err);
    console.log("Error");

    listing.forEach(function (aListing) {
      if (aListing.images.length > 0) {
        for (let i = 0; i < aListing.images.length; i++) {
          aListing.images[i] = `src=${aListing.images[i]}`;
        }
      }
    });

    console.log(listing);
    res.render("listing/listings", {
      AllListings: listing,
    });
  });
};

//Portal to create a listing
exports.showCreateListing = function (req, res) {
  console.log("Routed to createListing page.");
  res.render("admin/createListing");
};

//Creates the actual listing
exports.createListing = function (req, res) {
  console.log("Routed to actual listing creation");

  //List of files
  var files = req.files;

  //Create dir list
  var image_dir_list = [];
  files.forEach((file) => {
    var relative_path = file.path.indexOf('images');
    file.path = file.path.substring(relative_path);
    image_dir_list.push(file.path);
  });

  var listing = new Listing({
    address: req.body.address,
    borough: req.body.borough,
    zip: req.body.zip,
    bedroom: req.body.bedroom,
    bathroom: req.body.bathroom,
    type: req.body.type,
    apt_num: req.body.apt_num,
    ask_price: req.body.ask_price,
    amenities: req.body.amenities,
    //path to images of listing
    images: image_dir_list,
  });

  listing
    .save()
    .then((data) => {
      console.log("Successfully created a new Listing");

      res.render("listing/success", {
        listing: listing.address,
        image: image_dir_list,
      });
    })
    .catch((error) => {
      console.log("Could not create.");

      res.render("admin/createListing");
    });
};
