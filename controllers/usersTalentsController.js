var db = require('../models');

// POST '/api/users/:user_id/talents'
function create(req, res) {
  db.User.findById(req.params.user_id, function(err, foundUser) {
    foundUser.talents.push(req.body);
    foundUser.save(function(err, savedUser) {
      res.json(savedUser);
    })
  })
}

// PUT '/api/users/:user_id/talents/:talent_id'
function update(req, res) {
}

// DELETE '/api/users/:userId/talents/:talent_id'
function destroy(req, res) {
}

module.exports = {
  create: create,
  update: update,
  destroy: destroy
};
