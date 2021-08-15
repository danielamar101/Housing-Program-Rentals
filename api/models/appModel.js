'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const ListingSchema = new Schema({
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

const InviteSchema = new Schema({
    invite_code: {type: String, required: true},
});

mongoose.model('Invite',InviteSchema);
mongoose.model('User', UserSchema);
mongoose.model('Listing',ListingSchema);


// const Invite = mongoose.model('Invite');

// var oneThing = new Invite({invite_code: 'natalie'}).save().then(() => {
//     console.log("Saved Invite successfully")
// }).catch((error) => {
//     console.log("Error saving invite.." + error);
// });

// const User = mongoose.model('User');

// var twoThing = new User({
//     email: 'test',
//     password: 'test12'
// }).save().then(() => {
//     console.log("Saved User successfully")
// }).catch((error) => {
//     console.log("Error saving user.." + error);
// });

// const Listing = mongoose.model('Listing');

// var threeThing = new Listing({
//     address: '12 Gutheil Lane',
//     borough: 'Great Neck',
//     zip: '11024',
//     bedroom: '1',
//     bathroom: '1',
//     type: '1',
//     apt_num: '1',
//     ask_price: '69',
//     amenities: 'All',
//     //path to images of listing
//     images: ['/This/Is/A/Test']
// }).save().then(() => {
//     console.log("Saved listing successfully")
// }).catch((error) => {
//     console.log("Error saving listing.." + error);
// });


