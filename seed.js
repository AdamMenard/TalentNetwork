var db = require("./models");

var usersList = [{
 name: 'John',
 email: 'johntest@gmail.com',
 location: 'San Francisco',
 talents: [ 'soft-engineer', 'writing' ]
}, {
 name: 'Lily',
 email: 'lilytest@gmail.com',
 location: 'New York',
 talents: [ 'ice-skating' ]
}, {
 name: 'Jack',
 email: 'jacktest@gmail.com',
 location: 'Chicago',
 talents: [ 'teaching', 'singing', 'dacing', 'swimming' ]
}, {
 name: 'Ann',
 email: 'anntest@gmail.com',
 location: 'Boston',
 talents: [ 'piano', 'painting' ]
}];


var talentsList = [{
  name: 'sport',
  description: "I can play basketball",
  image: "sport image"
}, {
  name: 'chess',
  description: "really old board game",
  image: "chess image"
}, {
  name: 'darts',
  description: "fun game, I love darts",
  image: "dartboard image"
}, {
  name: 'art',
  description: "making art",
  image: "art image"
}, {
  name: 'fishing',
  description: "fish everyday",
  image: "fish image"
}, {
  name: 'painting',
  description: "painting is my hobby",
  image: "painting image"
}, {
  name: 'draw',
  description: "No 1 drawer in USF",
  image: "draw image"
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
