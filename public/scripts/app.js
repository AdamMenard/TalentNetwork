$(document).ready(function() {

  $.ajax({
    method: "GET",
    url: "/api/users",
    success: handleSuccess,
    error: handleError
  });

  function handleSuccess(allUsersFromDb) {
    allUsersFromDb.forEach(function(eachUser) {
      $('#users').append(`<div class="panel">
        <p>${eachUser.name}</p>
        <p>${eachUser.email}</p>
        <p>${eachUser.location}</p>
      </div>`);
    });
  }

  function handleError(errorResponse) {
    debugger
  }

});
