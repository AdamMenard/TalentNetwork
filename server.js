// SERVER-SIDE JAVASCRIPT

// require Express, create an Express app
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// add the body-parser middleware to the server
app.use(bodyParser.urlencoded({ extended: true }));

// serve the public directory as a static file directory
app.use(express.static('public'));

// Require the models directory in server.js
var db = require('./models');
var controllers = require('./controllers');

/**********
 * ROUTES *
**********/

/*
  HTML ENDPOINTS
*/

// add a route so your server will respond to GET / by serving index.html
app.get('/', function homepage (req, res) {
  res.sendFile('views/index.html', { root : __dirname });
});

/*
 * JSON API ENDPOINTS
 */

// create a new route for GET /api with callback controllers.api.index
app.get('/api', controllers.api.index);
app.get('/api/users', controllers.users.index);
app.get('/api/users/:user_id', controllers.users.show);
// app.get('/api/users/:user_id/talents', controllers.usersTalents.index);

app.post('/api/users', controllers.users.create);
app.put('/api/users/:user_id/talents', controllers.usersTalents.create);

app.put('/api/users/:id', controllers.users.update);
app.put('/api/users/:user_id/talents/:talent_id', controllers.usersTalents.update);
app.put('/api/users/:user_id/editTalents/:talent_id', controllers.usersTalents.update);

app.delete('/api/users/:user_id', controllers.users.destroy);
app.delete('/api/users/:user_id/talents/:talent_id', controllers.usersTalents.destroy);

/**********
 * SERVER *
**********/

// tell the app to listen on a port so that the server will start
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
