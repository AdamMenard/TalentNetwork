var db = require('../models');

// GET '/api/users/:userId/talents'
function index(req, res) {
}

// POST '/api/users/:user_id/talents'
function create(req, res) {
  db.User.findById(req.params.user_id, function(err, foundUser) {
    // foundUser = {name: 'Bob', talents: []};
    foundUser.talents.push(req.body);
    foundUser.save(function(err, savedUser) {
      res.json(savedUser);
    })
  })
}

// PUT '/api/users/:user_id/talents/:talentId'
function update(req, res) {
}

// DELETE '/api/users/:userId/talents/:talentId'
function destroy(req, res) {
}

module.exports = {
  index: index,
  create: create,
  update: update,
  destroy: destroy
};
