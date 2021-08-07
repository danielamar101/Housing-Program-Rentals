"use strict";
var mongoose = require("mongoose");
var Listing = mongoose.model("Listings");
var path = require("path");
const fs = require("fs");

//GET - view home page
exports.showHome = function (req, res) {
  console.log("Routed to home page.");

  res.render("pages/index");
};

//GET - view about page
exports.showAbout = function (req, res) {
  console.log("Routed to about page.");
  res.render("pages/about");
};

//GET - view contact us page
exports.showContactUs = function (req, res) {
  console.log("Routed to contact us page.");
  res.render("listing/contactus");
};

//GET - View create listing page
exports.showCreateListing = function (req, res) {
  console.log("Routed to createListing page.");
  res.render("listing/createListing");
};

function convertImageSourceMultiple(listing) {
  listing.forEach((aListing) => {
    if (aListing.images.length > 0) {
      for (let i = 0; i < aListing.images.length; i++) {
        //TODO: Find a better method than this lol
        aListing.images[i] = `src=${aListing.images[i]}`;
      }
    }
  });

  return listing;
}

//GET - view listings page
exports.showListings = function (req, res) {
  
  renderPageWithAllListings(req,res,"listing/listings",['AllListings','id_list']);
};

// Param pageToRender
// Param args: names of properties that will be sent
// Param  actionType: edit/listing/delete 
function renderPageWithAllListings(req,res,pageToRender,args,actionType){
  //Query listing database for all listings
  //TODO: Add filter
  return Listing.find({}, function (err, listing) {
    if (err) res.send(err);

    let id_list = [];
    //Changes src element to correct one
    listing = convertImageSourceMultiple(listing);

    listing.forEach((aListing) => {
      if(actionType === 'listing'){
        id_list.push(`href=listing/${aListing.id}`);
      } else if(actionType === 'delete'){
        id_list.push(`href=delete/${aListing.id}`);
      } else{
        id_list.push(`href=listing/${aListing.id}`);
      }
    });

    res.render(pageToRender, {
      [args[0]] : listing,
      [args[1]] : id_list

    });
  });

}

exports.show_a_listing = function (req, res) {
  Listing.findOne({ _id: req.params.id }, function (err, listing) {
    if (err) {
      console.log("Error processing listing.");
      //res.redirect("/listings");
    }
    if (listing !== null && listing !== undefined) {

      for (let i = 0; i < listing.images.length; i++) {
        //TODO: Find a better method than this lol
        listing.images[i] = `src=../../${listing.images[i]}`;
      }
      console.log(`Sending listing with:  \n${listing}`);


      res.render("listing/listing", {
        a_listing: listing
      });
      res.end();
    } else {
      console.log("Could not find listing.");
      res.redirect("/listings");
    }
  });
};

//Authentication done before this area
//GET - See portal page
exports.view_admin_portal = function (req, res) {
  //If a person isn't signed it you won't be able to go there
  //checkSignIn(req,res);

  console.log(req.session);
  res.render("admin/portal", {
    user: req.session.username,
    loggedIn: req.session.loggedIn,
  });
};

exports.edit_listings = function (req, res) {};

//Should be post is get right now
//TODO: Brainstorm if this is neccesary to keep
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

//POST - Create listing code
exports.createListing = function (req, res) {
  console.log("Routed to actual listing creation");
  console.log(req);
  //List of files
  var files = req.files;

  //Create dir list
  var image_dir_list = [];
  files.forEach((file) => {
    //Converts absolute path to a relative one
    var relative_path = file.path.indexOf("images");
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
      console.log("Could not create a listing.");

      res.render("admin/createListing");
    });
};

//GET - See login page
exports.view_logout = function (req, res) {

  res.render("user/logout");
  
};

exports.view_edit_listings = function (req, res) {

  renderPageWithAllListings(req,res,"listing/edit_listings",['AllListings','id_list']);

};
exports.view_delete_listings = function (req, res) {
  renderPageWithAllListings(req,res,"listing/delete_listings",['AllListings','id_list']);// res.render("listing/delete_view"{

};