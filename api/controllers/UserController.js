'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('Users');
var bcrypt = require('bcrypt');
var path = require('path');

exports.list_all_users = function(req, res) {

  User.find({}, function(err, user) {
    if (err)
      res.send(err);
      console.log("Error");
      
    //res.json(user);
    
    res.render('pages/testListing', {
      UserString : user,  
    });
  });
};

exports.view_login = function(req, res){

  res.render('user/login')
};

exports.view_signup = function(req, res){

  res.render('user/signup')
};



exports.signup = function(req, res) {
  console.log('routed to signup page.')
  var user = new User({
    email : req.body.email,
    password : req.body.password,
    passwerd : req.body.passwerd,

    });

    if(user.password != user.passwerd){
      console.log("Passwords don't match!")
      console.log(user.password + ' !=' + user.passwerd);
      res.render('user/signup')
    }else{
      console.log('passwords are the same')
    }


  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) { 
      return next(err);
    }
    user.password = hash;
    user.save().then(data => {
      console.log('Successfully created a new User');
      

    }).catch(error => {
       // you can send an error code here
      res.send(err);
    
    });
});
  
console.log('Routing to success page')
res.render('user/success', {
  name: 'daniel',
  da_user: user.email,
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

