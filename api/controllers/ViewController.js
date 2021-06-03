'use strict';

var path = require('path');

exports.showHome = function(req, res) {
    console.log("Routed to home page.");
    var mascots = [
      { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
      { name: 'Tux', organization: "Linux", birth_year: 1996},
      { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    ];
    var tagline = "No programming concept is complete without a cute animal mascot.";
  
    res.render('pages/index', {
      mascots: mascots,
      tagline: tagline
    });
    //res.render('pages/index')

};

exports.showAbout = function(req,res){
  console.log("Routed to about page.");
   res.render('pages/about')
}


exports.showRentals = function(req,res) {
  console.log("Routed to rentals page.")
  res.sendFile(path.join(__dirname,'/../../views/Rentals.html'));

};

