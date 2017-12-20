var db = require('../models');

// GET /api/users
function index(req, res) {
  // access database and pull out all users
  db.User.find({}, function(err, allUsers) {
    res.json(allUsers);
  });
}

// POST /api/users
function create(req, res) {
  // create an user based on request body and send it back as JSON

  // break data in the genre field into an array
  var genres = req.body.genres.split(', ');
  req.body.genres = genres;

  db.User.create(req.body, function(err, user) {
    if (err) { console.log('error', err); }
    res.json(user);
  });
}

// GET /api/users/:userId
function show(req, res) {
  // find one user by id and send it back as JSON
  db.User.findById(req.params.user_id, function(err, foundUser) {
    res.json(foundUser);
  });
}

// DELETE /api/users/:userId
function destroy(req, res) {
  // find one user by id, delete it, and send it back as JSON
  db.User.findByIdAndRemove(req.params.user_id, function(err, deletedUser) {
    if (err) { console.log('error', err); }
    res.send(200);
  });
}

// PUT or PATCH /api/users/:userId
function update(req, res) {
  // find one user by id, update it based on request body,
  // and send it back as JSON

  db.User.findById(req.params.id, function(err, foundUser) {
    if (err) { console.log('usersController.update error', err); }
    foundUser.artistName = req.body.artistName;
    foundUser.name = req.body.name;
    foundUser.releaseDate = req.body.releaseDate;
    foundUser.save(function(err, savedUser) {
      if (err) { console.log('saving altered user failed'); }
      res.json(savedUser);
    });
  });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
