'use strict';
//Splits up routes for cleanliness
module.exports = function(app) {
  var userRoutes = require('./userRoutes')
  var homeRoutes = require('./homeRoutes')

  userRoutes(app)
  homeRoutes(app)


};