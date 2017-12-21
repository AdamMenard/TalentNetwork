$(document).ready(function() {

// GET REQUEST FROM DATABASE
  $.ajax({
    method: "GET",
    url: "/api/users",
    success: handleGetSuccess,
    error: handleError
  });

  function handleGetSuccess(allUsersFromDb) {
    allUsersFromDb.forEach(function(eachUser) {
      var arrayOfTalentDivs = eachUser.talents.map(function(eachTalent) {
        return `<div class="card">
          <p>${eachTalent.name}</p>
          <p>${eachTalent.description}</p>
          <img src="${eachTalent.image}"/>
        </div>`;
      });

      $('#users').prepend(`
        <div class="panel" data-id="${eachUser._id}">
          <button name="button"  type="button" class="delete-user btn btn-danger pull-right" data-id=${eachUser._id}>Delete</button>
            <h4>Meet this talented person</h4>
          <p>${eachUser.name}</p>
          <p>${eachUser.email}</p>
          <p>${eachUser.location}</p>
          <div>
            <h4>Check out their talents</h4>
            ${ arrayOfTalentDivs.join('') }
          </div>

          <div>
          <!-- Button trigger modal: Add Talent -->
          <button type="button" class="btn btn-primary" data-toggle="modal"data-target="#addTalentButton">Add Talent</button>
          </div>
        </div>
      `);
    });
  }

  function handleError(errorResponse) {
    console.log('There was an error: ', errorResponse);
  }


// SUBMIT BUTTON FOR CREATING NEW USER
  $('#user-form form').on('submit', function(event) {
    event.preventDefault();
    var newUser = $(this).serialize();

    $.ajax({
      method: "POST",
      url: '/api/users',
      data: newUser,
      success: onCreateSuccess,
      error: handleError
    });
  });

  function onCreateSuccess(createdUser) {

      var arrayOfTalentDivs = createdUser.talents.map(function(createdTalent) {
        return `<div class="card">
          <p>${createdTalent.name}</p>
          <p>${createdTalent.description}</p>
          <img src="${createdTalent.image}"/>
        </div>`;
      });

      $('#users').prepend(`
        <div class="panel" data-id="${createdUser._id}">
          <button name="button"  type="button" class="delete-user btn btn-danger pull-right" data-id=${createdUser._id}>Delete</button>
            <h4>Meet this talented person</h4>
          <p>${createdUser.name}</p>
          <p>${createdUser.email}</p>
          <p>${createdUser.location}</p>
          <div>
            <h4>Check out their talents</h4>
            ${ arrayOfTalentDivs.join('') }
          </div>

          <div>
          <!-- Button trigger modal: Add Talent -->
          <button type="button" class="btn btn-primary" data-toggle="modal"data-target="#addTalentButton">Add Talent</button>
          </div>
        </div>`
      )
    };


// DELETE BUTTON USER PROFILE
  $('.container').on('click', '.delete-user', function() {
    $.ajax({
      method: 'DELETE',
      url: '/api/users/'+$(this).attr('data-id'),
      success: deleteUserSuccess,
      error: handleError
    });
  });

  function deleteUserSuccess(userDeletedInDb) {
    // find the user ID i want to delete
    let userIdToDelete = userDeletedInDb._id;

    // find the div with that same ID on the page
    let $userDivToDelete = $(`.panel[data-id=${userIdToDelete}]`);

    // write jquery to remove that div
    $userDivToDelete.remove();
  }
});
