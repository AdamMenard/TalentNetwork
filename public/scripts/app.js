var allUsers = [];

$(document).ready(function() {

  $.ajax({
    method: "GET",
    url: "/api/users",
    success: handleSuccess,
    error: handleError
  });


  $('#user-form form').on('submit', function(event) {
    event.preventDefault();
    var newUser = $(this).serialize();

    $.ajax({
      method: "POST",
      url: '/api/users',
      data: newUser,
      success: function onCreateSuccess(createdUser) {
        $('#users').append(`<div class = "panel">
          <p>${createdUser.name}</p>
          <p>${createdUser.email}</p>
          <p>${createdUser.location}</p>
      </div>`);
        allUsers.push(createdUser);
        location.reload();
      },
      error: function(Onerr) {}
    });
  });

  $('.container').on('click', '.delete-user', function() {
    $.ajax({
      method: 'DELETE',
      url: '/api/users/'+$(this).attr('data-id'),
      success: deleteUserSuccess,
      error: deleteUserError
    });
  });


});

  function handleSuccess(allUsersFromDb) {
    allUsersFromDb.forEach(function(eachUser) {
      var arrayOfTalentDivs = eachUser.talents.map(function(eachTalent) {
        return `<div class="card">
          <p>${eachTalent.name}</p>
          <p>${eachTalent.description}</p>
          <img src="${eachTalent.image}"/>
        </div>`;
      });

      $('#users').append(`<div class="panel">
        <p>${eachUser.name}</p>
        <p>${eachUser.email}</p>
        <p>${eachUser.location}</p>
        <div>
          <h1>Talents</h1>

        </div>
          ${ arrayOfTalentDivs.join('') } 
          <button name="button"  type="button" class="delete-user btn btn-danger pull-right" data-id=${eachUser._id}>Delete</button> 
        </div> 

        <div>  
        <!-- Button trigger modal: Add Talent -->
        <button type="button" class="btn btn-primary" data-toggle="modal"data-target="#addTalentButton">Add Talent</button>
        </div>

      </div>`);
    });
    allUsers = allUsersFromDb;
  }

  function handleError(errorResponse) {
    console.log('There was an error: ', errorResponse);
  }

function deleteUserSuccess(json) {
  var user = json;
  var userId = user._id;


    $.ajax({
      method: "POST",
      url: '/api/users',
      data: newUser,
      success: function onCreateSuccess(createdUser) {
        $('#users').append(`<div class = "panel">
          <p>${createdUser.name}</p>
          <p>${createdUser.email}</p>
          <p>${createdUser.location}</p>
      </div>`);
      },
      error: function(Onerr) {}
    })

  
  console.log('clicked');
  // find the book with the correct ID and remove it from our allBooks array
  for(var index = 0; index < allUsers.length; index++) {
    if(allUsers[index]._id === userId) {
      allUsers.splice(index, 1);
      break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  location.reload();
}


function deleteUserError() {
  console.log("user deleting error!");
}



