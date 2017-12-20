/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


// hard-coded data
var sampleUsers = [{
  artistName: 'Ladyhawke',
  name: 'Ladyhawke',
  releaseDate: '2008, November 18',
  genres: [ 'new wave', 'indie rock', 'synth pop' ]
}, {
  artistName: 'The Knife',
  name: 'Silent Shout',
  releaseDate: '2006, February 17',
  genres: [ 'synth pop', 'electronica', 'experimental' ]
}, {
  artistName: 'Juno Reactor',
  name: 'Shango',
  releaseDate: '2000, October 9',
  genres: [ 'electronic', 'goa trance', 'tribal house' ]
}, {
  artistName: 'Philip Wesley',
  name: 'Dark Night of the Soul',
  releaseDate: '2008, September 12',
  genres: [ 'piano' ]
}];


$(document).ready(function() {
  console.log('app.js loaded!');

  // make a GET request for all users
  $.ajax({
    method: 'GET',
    url: '/api/users',
    success: handleSuccess,
    error: handleError
  });

  $('#user-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();

    $.post('/api/users', formData, function(user) {
      renderUser(user);
    })

    // reset form input values after formData has been captured
    $(this).trigger("reset");
  });

  // add click handler to 'add talent' buttons
  $('#users').on('click', '.add-talent', function(e) {
    console.log('add-talent clicked!');

    var id = $(this).closest('.user').data('user-id');
    console.log('id', id);

    $('#talentModal').data('user-id', id);
    $('#talentModal').modal();
  });

  $('#users').on('click', '.delete-user', function(e) {
    var id = $(this).closest('.user').data('user-id');
    console.log('id', id);

    $.ajax({
      url: '/api/users/' + id,
      type: 'DELETE',
      success: function(result) {
        $('[data-user-id=' + id + ']').remove();
      }
    });
  });

  $('#saveTalent').on('click', handleNewTalentSubmit);
  $('#users').on('click', '.edit-user', handleUserEditClick);
  $('#users').on('click', '.save-user', handleUserSaveClick);
  $('#users').on('click', '.edit-talents', handleTalentsEditClick);

  $('#editTalentsModalBody').on('click', 'button.btn-danger', handleDeleteTalentClick);
  $('#editTalentsModal').on('click', 'button#editTalentsModalSubmit', handleUpdateTalentsSave);

});


// UPDATE SONG
function handleUpdateTalentsSave(e) {
  var $modal = $('#editTalentsModal');

  if ($modal.find('form').length == 0) {
    // there are no talents to update
    $modal.modal('hide');
    return;
  }

  var userId = $modal.find('form').data('user-id');
  var updatedTalents = [];

  $modal.find('form').each(function () {
    var talent = {};
    talent._id = $(this).attr('id');
    talent.name = $(this).find('input.talent-name').val();
    talent.trackNumber = $(this).find('input.talent-trackNumber').val();

    updatedTalents.push(talent);
  });

  $modal.modal('hide');
  updateTalents(userId, updatedTalents);
}



function updateTalents(userId, talents) {
  // 1 PUT request per talentId
  // re-render entire user after all PUT requests are finished
  var url = '/api/users/' + userId + '/talents/';
  var deferreds = [];

  talents.forEach(function(talent) {
    var putRequest = $.ajax({
      method: 'PUT',
      url: url + talent._id,
      data: talent,
      error: function(err) { console.log('Error updating talent', talent.name, err); }
    });

    deferreds.push(putRequest);
  });

  // wait for all deferreds, then refetch and re-render the user
  $.when.apply(null, deferreds).always(function() {
    console.log('all updates received – time to refresh user');
    fetchAndReRenderUserById(userId);
  });
}

function handleSuccess (users) {
  users.forEach(function(user) {
    renderUser(user);
  });
};

function handleError(err){
  console.log('There has been an error: ', err);
}


// when the edit button for an user is clicked
function handleUserEditClick(e) {
  var $userRow = $(this).closest('.user');
  var userId = $userRow.data('user-id');
  console.log('userId to edit', userId);

  // show 'Save Changes' button
  $userRow.find('.save-user').toggleClass('hidden');
  // hide 'Edit' button
  $userRow.find('.edit-user').toggleClass('hidden');

  // get user name and replace its field with an input element
  var userName = $userRow.find('span.user-name').text();
  $userRow.find('span.user-name').html('<input class="edit-user-name" value="' + userName + '"></input>');

  // get the artist name and replace its field with an input element
  var artistName = $userRow.find('span.artist-name').text();
  $userRow.find('span.artist-name').html('<input class="edit-artist-name" value="' + artistName + '"></input>');

  // get the releasedate and replace its field with an input element
  var releaseDate = $userRow.find('span.user-releaseDate').text();
  $userRow.find('span.user-releaseDate').html('<input class="edit-user-releaseDate" value="' + releaseDate + '"></input>');
}


function handleUserSaveClick() {
  var userId = $(this).parents('.user').data('user-id'); // $(this).closest would have worked fine too
  var $userRow = $('[data-user-id=' + userId + ']');

  var data = {
    name: $userRow.find('.edit-user-name').val(),
    artistName: $userRow.find('.edit-artist-name').val(),
    releaseDate: $userRow.find('.edit-user-releaseDate').val()
  };

  console.log('PUTing data for user', userId, 'with data', data);

  $.ajax({
    method: 'PUT',
    url: '/api/users/' + userId,
    data: data,
    success: handleUserUpdatedResponse
  });
}


function handleUserUpdatedResponse(data) {
  console.log('response to update', data);

  var userId = data._id;

  // remove this user from the page, re-draw with updated data
  $('[data-user-id=' + userId + ']').remove();
  renderUser(data);
}


function handleTalentsEditClick() {
  var $userRow = $(this).closest('.user');
  var userId = $userRow.data('user-id');

  $.get('/api/users/' + userId + "/talents", function(talents) {
    var editTalentsFormsHtml = buildEditTalentsForms(userId, talents);
    $('#editTalentsModalBody').html(editTalentsFormsHtml);

    $('#editTalentsModal').modal();
  });
}


function buildEditTalentsForms(userId, talents) {
  var talentEditFormHtmlStrings = talents.map(function(talent) {
    return `
      <form class="form-inline" id="${talent._id}" data-user-id="${userId}" >
        <div class="form-group">
          <input type="text" class="form-control talent-trackNumber" value="${talent.trackNumber}">
        </div>
        <div class="form-group">
          <input type="text" class="form-control talent-name" value="${talent.name}">
        </div>
        <div class="form-group">
          <button class="btn btn-danger" data-talent-id="${talent._id}">x</button>
        </div>
      </form>
    `;
  });

  // combine all talent forms into a single string
  return talentEditFormHtmlStrings.join('');
}


// this function takes a single user and renders it to the page
function renderUser(user) {
  // list talents along with each user
  var formattedTalentsList = user.talents.map(function(talent) {
    return `- (${ talent.trackNumber }) ${ talent.name }`;
  });
  var formattedTalentsStr = formattedTalentsList.join(', ');

  // HTML template string for each user
  var userHtml = `
    <!-- one user -->
    <div class="row user" data-user-id=${ user._id }>

      <div class="col-md-10 col-md-offset-1">
        <div class="panel panel-default">
          <div class="panel-body">

          <!-- begin user internal row -->
            <div class='row'>
              <div class="col-md-3 col-xs-12 thumbnail user-art">
                <img src="../images/800x800.png" alt="user image">
              </div>

              <div class="col-md-9 col-xs-12">
                <ul class="list-group">
                  <li class="list-group-item">
                    <h4 class='inline-header'>User Name:</h4>
                    <span class='user-name'>${ user.name }</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Artist Name:</h4>
                    <span class='artist-name'>${ user.artistName }</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Released date:</h4>
                    <span class='user-releaseDate'>${ user.releaseDate }</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class="inline-header">Talents:</h4>
                    <span>${ formattedTalentsStr }</span>
                  </li>
                </ul>
              </div>

            </div>
            <!-- end of user internal row -->

            <div class='panel-footer'>
              <button class='btn btn-primary add-talent'>Add Talent</button>
              <button class='btn btn-info edit-talents'>Edit Talents</button>
              <button class='btn btn-danger delete-user'>Delete User</button>
              <button class='btn btn-info edit-user'>Edit User</button>
              <button class='btn btn-info save-user hidden'>Save Changes</button>
            </div>

          </div>

        </div>

      </div>

    </div>
    <!-- end one user -->
  `;

  // render HTML template in the DOM
  $('#users').prepend(userHtml);
}

function handleNewTalentSubmit(e) {
  e.preventDefault();
  console.log('in handleNewTalentSubmit function');

  var $modal = $('#talentModal');
  var $talentNameField = $modal.find('#talentName');
  var $trackNumberField = $modal.find('#trackNumber');

  var userId = $modal.data('userId');

  // get data from modal fields
  // note the server expects the keys to be 'name', 'trackNumber' so we use those.
  var postData = {
    name: $talentNameField.val(),
    trackNumber: $trackNumberField.val()
  };

  // POST to SERVER
  var talentPostUrl = '/api/users/'+ userId + '/talents';
  $.post(talentPostUrl, postData, function(data) {
    $modal.modal('hide');

    $talentNameField.val('');
    $trackNumberField.val('');

    var userGetUrl = '/api/users/' + userId;
    $.get(userGetUrl, function(updatedUser) {
      // remove current instance of user
      $('[data-user-id=' + userId + ']').remove();

      // re-render user with new talents
      renderUser(updatedUser);
    });
  }).fail(function(xhr, status, err) {
    console.log('post to /api/users/:userId/talents resulted in error', err);
  });
}


function handleDeleteTalentClick(e) {
  e.preventDefault();
  var talentId = $(this).data('talent-id');
  var userId = $(this).closest('form').data('user-id');

  var url = '/api/users/' + userId + '/talents/' + talentId;
  console.log('send DELETE ', url);
  $.ajax({
    method: 'DELETE',
    url: url,
    success: handleTalentDeleteResponse
  });
}

function handleTalentDeleteResponse(data) {
  var talentId = data._id;
  var $formRow = $('form#' + talentId);
  var userId = $formRow.data('user-id');

  // remove talent edit form from the page
  $formRow.remove();
  fetchAndReRenderUserById(userId);
}

function fetchAndReRenderUserById(userId) {
  $.get('/api/users/' + userId, function(data) {
    $('div[data-user-id=' + userId + ']').remove();
    renderUser(data);
  });
}
