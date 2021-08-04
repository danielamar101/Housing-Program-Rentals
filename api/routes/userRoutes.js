"use strict";
module.exports = function (app) {
  var UserController = require("../controllers/UserController");
  var authenticator = require("../controllers/helpers/authenticator");

  app.route("/login").get(UserController.view_login).post();

  app.route("/auth").post(authenticator.authenticate, UserController.portal);

  app.route("/logout").get(UserController.logout);

  app.route("/view_logout").get(UserController.view_logout);
  app
    .route("/signup")
    .get(UserController.view_signup)
    .post(UserController.signup);

  app.route("/list_all_users").get(UserController.list_all_users);

  app.route("/users").get(UserController.list_all_users);

  //   app.route('/users/:userId')
  //     .get(UserController.read_a_user)
  //     .put(UserController.update_a_user)
  //     .delete(UserController.delete_a_user);
};
