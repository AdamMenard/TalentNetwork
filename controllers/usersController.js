var db = require('../models');

// GET /api/users
function index(req, res) {
  db.User.find({}, function(err, allUsers) {
    res.json(allUsers);
  });
}

// POST /api/users
function create(req, res) {
  db.User.create(req.body, function(err, user) {
    if (err) { console.log('error', err); }
    res.json(user);
  });
}

// GET /api/users/:userId
function show(req, res) {
  db.User.findById(req.params.user_id, function(err, foundUser) {
    res.json(foundUser);
  });
}

// DELETE /api/users/:userId
function destroy(req, res) {
  db.User.findByIdAndRemove(req.params.user_id, function(err, deletedUser) {
    if (err) { console.log('error', err); }
    res.send(200);
  });
}

// PUT or PATCH /api/users/:userId
function update(req, res) {
  db.User.findById(req.params.id, function(err, foundUser) {
  });
}



module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
