'use strict';
//Splits up routes for cleanliness
module.exports = function(app) {
  var userRoutes = require('./userRoutes');
  var homeRoutes = require('./pageRoutes');
  var inviteRoutes = require('./inviteRoutes');

  userRoutes(app);
  homeRoutes(app);
  inviteRoutes(app);


};