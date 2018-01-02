var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

var db = require('./models');
var controllers = require('./controllers');

/**********
 * ROUTES *
**********/

/*
  HTML ENDPOINTS
*/
app.get('/', function homepage (req, res) {
  res.sendFile('views/index.html', { root : __dirname });
});

/*
 * JSON API ENDPOINTS
 */
app.get('/api', controllers.api.index);
app.get('/api/users', controllers.users.index);
app.get('/api/users/:user_id', controllers.users.show);

app.post('/api/users', controllers.users.create);
app.post('/api/users/:user_id/talents', controllers.usersTalents.create);

app.put('/api/users/:user_id', controllers.users.update);
app.put('/api/users/:user_id/talents/:talent_id', controllers.usersTalents.update);

app.delete('/api/users/:user_id', controllers.users.destroy);
app.delete('/api/users/:user_id/talents/:talent_id', controllers.usersTalents.destroy);

/**********
 * SERVER *
**********/

app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
