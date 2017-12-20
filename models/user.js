// require mongoose
// set up shorthand Schema variable to stand in for mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Talent = require('./talent');

// user schema
var UserSchema = new Schema({
  name: String,
  email: String,
  location: String,
  talents: [Talent.schema]
});

// user model
var User = mongoose.model('User', UserSchema);

module.exports = User;
