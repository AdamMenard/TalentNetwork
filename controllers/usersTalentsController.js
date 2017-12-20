var db = require('../models');

// GET '/api/users/:userId/talents'
function index(req, res) {
  db.User.findById(req.params.user_id, function(err, foundUser) {
    res.json(foundUser.talents);
  });
}

// POST '/api/users/:userId/talents'
function create(req, res) {
  db.User.findById(req.params.user_id, function(err, foundUser) {

    // dangerous – in a real app, we'd validate the incoming data
    var newTalent = new db.Talent(req.body);

    foundUser.talents.push(newTalent);
    foundUser.save(function(err, savedUser) {
      // responding with talent in JSON
      // some APIs may respond with parent obj as well (e.g. foundUser)
      res.json(newTalent);
    });
  });
}

// PUT '/api/users/:userId/talents/:talentId'
function update(req, res) {
  db.User.findById(req.params.user_id, function(err, foundUser) {
    var correctTalent = foundUser.talents.id(req.params.talent_id);

    if (correctTalent) {
      correctTalent.trackNumber = req.body.trackNumber;
      correctTalent.name = req.body.name;

      foundUser.save(function(err, saved) {
        console.log('UPDATED', correctTalent, 'IN ', saved.talents);
        res.json(correctTalent);
      });
    } else {
      res.send(404);
    }
  });
}

// DELETE '/api/users/:userId/talents/:talentId'
function destroy(req, res) {
  db.User.findById(req.params.user_id, function(err, foundUser) {
    console.log(foundUser);
    // we've got the user, now find the talent within it
    var correctTalent = foundUser.talents.id(req.params.talent_id);
    if (correctTalent) {
      correctTalent.remove();
      // resave the user now that the talent is gone
      foundUser.save(function(err, saved) {
        console.log('REMOVED ', correctTalent.name, 'FROM ', saved.talents);
        res.json(correctTalent);
      });
    } else {
      res.send(404);
    }
  });
}

module.exports = {
  index: index,
  create: create,
  update: update,
  destroy: destroy
};
