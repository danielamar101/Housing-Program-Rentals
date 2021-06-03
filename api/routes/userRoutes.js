'use strict';
module.exports = function(app) {
  var UserController = require('../controllers/UserController');


  app.route('/login')
   .get(UserController.view_login)
   .post();


  app.route('/signup')
   .get(UserController.view_signup)
   .post(UserController.signup);

  
  // app.route('/users')
  //   .get(UserController.list_all_users)
  //   .post(UserController.signup);

  app.route('/list_users').get(UserController.list_all_users)

  app.route('/users/:userId')
    .get(UserController.read_a_user)
    .put(UserController.update_a_user)
    .delete(UserController.delete_a_user);

};