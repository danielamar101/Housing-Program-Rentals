'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    userName: { type: String, unique: true,required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true }, 
    lastName: { type: String, required: true },
});
    

 // status: {
//     type: [{
//       type: String,
//       enum: ['pending', 'ongoing', 'completed']
//     }],
//     default: ['pending']
//   }
//});

module.exports = mongoose.model('Users', userSchema);