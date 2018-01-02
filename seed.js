var db = require("./models");

var talentsList = [{
  name: 'sport',
  description: "I can play basketball",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Basketball_through_hoop.jpg/440px-Basketball_through_hoop.jpg"
}, {
  name: 'chess',
  description: "really old board game",
  image: "/images/chess.jpeg"
}, {
  name: 'darts',
  description: "fun game, I love darts",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Darts_in_a_dartboard.jpg/566px-Darts_in_a_dartboard.jpg"
}, {
  name: 'art',
  description: "making art",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Lascaux2.jpg/440px-Lascaux2.jpg"
}, {
  name: 'fishing',
  description: "fish everyday",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Angler_at_devizes_england_arp.jpg/440px-Angler_at_devizes_england_arp.jpg"
}, {
  name: 'painting',
  description: "painting is my hobby",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Jungle_Arc.jpg/440px-Jungle_Arc.jpg"
}, {
  name: 'draw',
  description: "No 1 drawer in USF",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Ingres_Academic_Study_%28detail%29_03.jpg/340px-Ingres_Academic_Study_%28detail%29_03.jpg"
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
