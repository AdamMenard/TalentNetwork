var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Talent = require('./talent');

var UserSchema = new Schema({
  name: String,
  email: String,
  location: String,
  talents: [Talent.schema]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
