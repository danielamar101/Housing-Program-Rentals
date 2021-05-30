'use strict';
var mongoose = require('mongoose');
var path = require('path');

exports.showHome = function(req, res) {
    console.log("Routed to home page.");
    res.sendFile(path.join(__dirname,'/../../views/home.html'));

};


exports.showRentals = function(req,res) {
  console.log("Routed to rentals page.")
  res.sendFile(path.join(__dirname,'/../../views/Rentals.html'));

};

