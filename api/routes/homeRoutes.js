'use strict';
module.exports = function(app) {
  
  var viewController = require('../controllers/ViewController');


  app.route('/').get(viewController.showHome);

  app.route('/about').get(viewController.showAbout);

  app.route('/home').get(viewController.showHome);

  app.route('/rentals').get(viewController.showRentals);
  

  

};