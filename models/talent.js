var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TalentSchema = new Schema({
  name: String,
  description: String,
  image: String
});

var Talent = mongoose.model('Talent', TalentSchema);

module.exports = Talent;
