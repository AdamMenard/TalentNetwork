var db = require("./models");

var usersList = [{
  artistName: 'Nine Inch Nails',
  name: 'The Downward Spiral',
  releaseDate: '1994, March 8',
  genres: [ 'industrial', 'industrial metal' ]
}, {
  artistName: 'Metallica',
  name: 'Metallica',
  releaseDate: '1991, August 12',
  genres: [ 'heavy metal' ]
}, {
  artistName: 'The Prodigy',
  name: 'Music for the Jilted Generation',
  releaseDate: '1994, July 4',
  genres: [ 'electronica', 'breakbeat hardcore', 'rave', 'jungle' ]
}, {
  artistName: 'Johnny Cash',
  name: 'Unchained',
  releaseDate: '1996, November 5',
  genres: [ 'country', 'rock' ]
}];


var talentsList = [{
  name: 'Swamped',
  trackNumber: 1
}, {
  name: "Heaven's a Lie",
  trackNumber: 2
}, {
  name: 'Daylight Dancer',
  trackNumber: 3
}, {
  name: 'Humane',
  trackNumber: 4
}, {
  name: 'Self Deception',
  trackNumber: 5
}, {
  name: 'Aeon',
  trackNumber: 6
}, {
  name: 'Tight Rope',
  trackNumber: 7
}];


usersList.forEach(function(user) {
  user.talents = talentsList;
});


db.User.remove({}, function(err, users){
  // code in here runs after all users are removed
  db.User.create(usersList, function(err, users){
    // code in here runs after all users are created
    if (err) { return console.log('ERROR', err); }
    console.log("all users:", users);
    console.log("created", users.length, "users");
    process.exit();
  });
});
