$(document).ready(function() {

  $.ajax({
    method: "GET",
    url: "/api/users",
    success: handleSuccess,
    error: handleError
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
          ${ arrayOfTalentDivs.join('') }
        </div>
      </div>`);
    });
  }

  function handleError(errorResponse) {
    console.log('There was an error: ', errorResponse);
  }

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
      },
      error: function(Onerr) {}
    })


  })
});
