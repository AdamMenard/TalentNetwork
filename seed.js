var db = require("./models");

var talentsList = [{
  name: 'sport',
  description: "I can play basketball",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Basketball.png/170px-Basketball.png"
}, {
  name: 'chess',
  description: "really old board game",
  image: src("../public/images/chess.jpeg")
}, {
  name: 'darts',
  description: "fun game, I love darts",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Basketball.png/170px-Basketball.png"
}, {
  name: 'art',
  description: "making art",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Basketball.png/170px-Basketball.png"
}, {
  name: 'fishing',
  description: "fish everyday",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Basketball.png/170px-Basketball.png"
}, {
  name: 'painting',
  description: "painting is my hobby",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Basketball.png/170px-Basketball.png"
}, {
  name: 'draw',
  description: "No 1 drawer in USF",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Basketball.png/170px-Basketball.png"
}];

var usersList = [{
 name: 'John',
 email: 'johntest@gmail.com',
 location: 'San Francisco',
 talents: [talentsList[0], talentsList[1], talentsList[4]]
}, {
 name: 'Lily',
 email: 'lilytest@gmail.com',
 location: 'New York',
 talents: [talentsList[2], talentsList[3]]

}, {
 name: 'Jack',
 email: 'jacktest@gmail.com',
 location: 'Chicago',
 talents: [talentsList[4], talentsList[5]]

}, {
 name: 'Ann',
 email: 'anntest@gmail.com',
 location: 'Boston',
 talents: [talentsList[4], talentsList[6]]
}];


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
