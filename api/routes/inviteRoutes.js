'use strict';
module.exports = function(app) {
  var InviteController = require('../controllers/InviteController');


  app.route('/create_invite')
   .get(InviteController.create_invite_code);

};