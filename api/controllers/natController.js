'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('Users');
var bcrypt = require('bcrypt');

exports.list_all_users = function(req, res) {
  User.find({}, function(err, user) {
    if (err)
      res.send(err);
      console.log("Error");
    res.json(user);
  });
};




exports.create_a_user = function(req, res) {
  var user = new User({
    email : req.body.email,
    userName : req.body.userName,
    password : req.body.password,
    firstName : req.body.firstName,
    lastName : req.body.lastName
    });


  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) { 
      return next(err);
    }
    user.password = hash;
    user.save().then(data => {
      console.log('Successfully created a new User');
      res.send('Successfully created new User: ' + req.body.userName);
    }).catch(error => {
       // you can send an error code here
      res.send(err);
    
    });
});
  
};


exports.read_a_user = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.update_a_user = function(req, res) {
  User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.delete_a_user = function(req, res) {
  User.remove({
    _id: req.params.userId
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};

