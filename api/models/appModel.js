'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

var username = 'tankmybank';
var password = 'Illadelph12?';
var hosts = 'iad2-c12-2.mongo.objectrocket.com:54917,iad2-c12-1.mongo.objectrocket.com:54917,iad2-c12-0.mongo.objectrocket.com:54917';
var database = 'natsite-prod';
var options = '?replicaSet=4db59e42f2474892959d444975be539e';
var connectionString = 'mongodb://' + username + ':' + encodeURIComponent(password) + '@' + hosts + '/' + database + options;
var connection = mongoose.createConnection(connectionString);

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

const inviteModel = connection.model('Invites',inviteSchema);
const userModel = connection.model('Users', userSchema).syncIndexes();
const listingModel = connection.model('Listings',listingSchema);

module.exports = inviteModel;
module.exports = userModel;
module.exports = listingModel;

await  inviteModel.ensureIndexes();
await userModel.ensureIndexes();
await listingModel.ensureIndexes();
