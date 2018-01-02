// require mongoose and connect to database
var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/TalentNetwork');

module.exports = {
  User: require('./user'),
  Talent: require('./talent')
};
