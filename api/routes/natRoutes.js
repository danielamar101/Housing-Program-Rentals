'use strict';
module.exports = function(app) {
  var natList = require('../controllers/natController');
  var homeList = require('../controllers/homeController');

  console.log("In Routes area");

  app.route('/').get(homeList.showHome);
  app.route('/home').get(homeList.showHome);
  app.route('/rentals').get(homeList.showRentals);
  
  // natList Routes
  app.route('/users')
    .get(natList.list_all_users)
    .post(natList.create_a_user);


  app.route('/users/:userId')
    .get(natList.read_a_user)
    .put(natList.update_a_user)
    .delete(natList.delete_a_user);

};