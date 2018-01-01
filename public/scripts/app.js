$(document).ready(function() {


// GET REQUEST FROM DATABASE
  $.ajax({
    method: "GET",
    url: "/api/users/",
    success: handleGetSuccess,
    error: handleError
  });


  function handleGetSuccess(allUsersFromDb) {
    allUsersFromDb.forEach(function(eachUser) {
      var arrayOfTalentDivs = eachUser.talents.map(function(eachTalent) {
        return `
        <div class="card">
          <button class="accordion">${eachTalent.name}</button>
            <div class="panel">
                <p>${eachTalent.description}</p>
                <img src="${eachTalent.image}"/>
            </div>
        </div>`;
      });


      $('#users').prepend(`
        <div class="panel" data-id="${eachUser._id}">

        <!-- add talent Modal -->
        <div class="modal fade" id="addTalentButton-${eachUser._id}" tabindex="-1" role="dialog" aria-labelledby="addTalentButtonLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addTalentButtonLabel">Tell us about your talent, it the only way we will know!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                    <!-- TALENT FIELDS -->
                    <form class="addTalentForm" data-id="${eachUser._id}">
                      <div class="form-group">
                        <label class="col-md-4 control-label" for="talentName" placeholder="what do you call your talent?">Talent Name</label>
                        <div class="col-md-4">
                          <input class="form-control" id="talentName" name="name"></input>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-4 control-label" for="talentImage" >Talent Image</label>
                        <div class="col-md-4">
                          <input class="form-control" id="talentImage" name="image" placeholder="add the url for an image to describe your talent "></input>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-4 control-label" for="talentDesription">Talent Description</label>
                        <div class="col-md-4">
                          <textarea class="form-control" id="talentDesription" name="description" placeholder="tell us about your talent"></textarea>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary">Save changes</button>
                    </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>



          <button name="button"  type="button" class="delete-user btn btn-danger pull-right" data-id=${eachUser._id}>Delete</button>

            <h4>Meet this talented person</h4>
          <p><strong><u>${eachUser.name}</strong></u></p>
          <p>${eachUser.email}</p>
          <p>${eachUser.location}</p>
          <div>
            <h4>Check out their talents</h4>
            ${ arrayOfTalentDivs.join('') }
          </div>

          <div>
            <!-- Button trigger modal: Add Talent -->
          <button type="button" class="btn btn-primary" data-toggle="modal"data-target="#addTalentButton-${eachUser._id}">Add Talent</button>
          </div>

          <div>
            <!-- Button trigger modal: Edit Talent -->
          <button type="button" class="btn btn-primary" id="editTalentButton" data-toggle="modal"data-target="#editTalentButton">Edit Talent</button>
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
      url: '/api/users/',
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

        <!-- add talent Modal -->
        <div class="modal fade" id="addTalentButton-${createdUser._id}" tabindex="-1" role="dialog" aria-labelledby="addTalentButtonLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addTalentButtonLabel">Tell us about your talent, it the only way we will know!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                    <!-- TALENT FIELDS -->
                    <form class="addTalentForm" data-id="${createdUser._id}">
                      <div class="form-group">
                        <label class="col-md-4 control-label" for="talentName" placeholder="what do you call your talent?">Talent Name</label>
                        <div class="col-md-4">
                          <input class="form-control" id="talentName" name="name"></input>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-4 control-label" for="talentImage" >Talent Image</label>
                        <div class="col-md-4">
                          <input class="form-control" id="talentImage" name="image" placeholder="add the url for an image to describe your talent "></input>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-4 control-label" for="talentDesription">Talent Description</label>
                        <div class="col-md-4">
                          <textarea class="form-control" id="talentDesription" name="description" placeholder="tell us about your talent"></textarea>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary">Save changes</button>
                    </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>



          <button name="button"  type="button" class="delete-user btn btn-danger pull-right" data-id=${createdUser._id}>Delete</button>

            <h4>Meet this talented person</h4>
          <p><strong><u>${createdUser.name}</strong></u></p>
          <p>${createdUser.email}</p>
          <p>${createdUser.location}</p>
          <div>
            <h4>Check out their talents</h4>
            ${ arrayOfTalentDivs.join('') }
          </div>

          <div>
            <!-- Button trigger modal: Add Talent -->
          <button type="button" class="btn btn-primary" data-toggle="modal"data-target="#addTalentButton-${createdUser._id}">Add Talent</button>
          </div>

          <div>
            <!-- Button trigger modal: Edit Talent -->
          <button type="button" class="btn btn-primary" id="editTalentButton" data-toggle="modal"data-target="#editTalentButton">Edit Talent</button>
          </div>

        </div>
      `)
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


// PUT FUNCTION FOR UPDATING USER INFO



// BUTTON FOR EDIT TALENTS
   $('#editTalentForm').on('submit', function() {
     console.log("Edit talent button submit clicked");

     $.ajax({
       method: 'PUT',
       url: '/api/users/'+$(this).attr('data-id')+'/talents',
       // success: editTalentButtonSuccess,
       // error: error
     }) //end ajax
 });


// BUTTON FOR ADD TALENTS
   $('#users').on('submit', '.addTalentForm', function(e) {
     console.log("Edit talent button submit clicked");
     e.preventDefault();

     console.log('form data', $(this).serialize());

     $.ajax({
       method: 'PUT',
       url: '/api/users/'+$(this).attr('data-id') + '/talents',
       data: $(this).serialize(),
       success: addTalentButtonSuccess,
       error: function(err) { console.log(err); }
     });

     function addTalentButtonSuccess(userWithNewTalentAdded) {
       // add talent to the page
       location.reload();
     }
 });



// CLICK USER PROFILE TALENTS TO EXPAND: ACCORDION
 var acc = document.getElementsByClassName("accordion");

 for (var i = 0; i < acc.length; i++) {
     acc[i].addEventListener("click", function() {
         this.classList.toggle("active");
         var panel = this.nextElementSibling;
         if (panel.style.display === "block") {
             panel.style.display = "none";
         } else {
             panel.style.display = "block";
         }
     });
 }



}); //end doc.ready
