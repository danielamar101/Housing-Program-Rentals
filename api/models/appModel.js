'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    passwerd: { type: String, required: true },

});


var listingSchema = new Schema({
    address: {type: String, unique: true, required: true},
    borough: {type: String, required: true},
    zip: {type: String, required: true},
    bedroom: {type: String, required: true},
    bathroom: {type: String, required: true},
    type: {type: String, required: true},
    apt_num: {type: String, required: true},
    ask_price: {type: String, required: true},
    amenities: {type: String, required: false},
    //path to images of listing
    images: [{type: String, required: false}]
});

var inviteSchema = new Schema({
    invite_code: {type: String, required: true},
});

module.exports = mongoose.model('Users', userSchema);
module.exports = mongoose.model('Listings',listingSchema);
module.exports = mongoose.model('Invite',inviteSchema);
