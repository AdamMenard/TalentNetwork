// require mongoose and connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TalentNetwork');

var User = require('./user');
var Talent = require('./talent');

module.exports = {
  User: User,
  Talent: Talent
};
