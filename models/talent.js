// require mongoose
// set up shorthand Schema variable to stand in for mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// talent schema
var TalentSchema = new Schema({
  name: String,
  description: String,
  image: String
});

// talent model
var Talent = mongoose.model('Talent', TalentSchema);

module.exports = Talent;
