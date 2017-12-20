// require mongoose
// set up shorthand Schema variable to stand in for mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Talent = require('./talent');

// user schema
var UserSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [ String ],
  talents: [ Talent.schema ]
});

// user model
var User = mongoose.model('User', UserSchema);

module.exports = User;
