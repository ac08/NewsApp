$(document).ready(() => {

  $(':text').css('border', '3px solid red');
  $('.category').find('span').css('border', '3px solid green');


  // Variable Declaration
  // =============================================================
  const selectedCategories = [];

  // const first_nm = $('#firstname').val().trim();
  // const last_nm = $('#lastname').val().trim();
  // const userData = {
  //   first_nm,
  //   last_nm,
  //   selectedCategories
  // };

  // Template Calls
  // =============================================================
  // const makePutCall = (url, data) => {
  //   const json_data = JSON.stringify(data);

  //   return $.ajax({
  //     type: 'PUT',
  //     url,
  //     data: json_data,
  //     dataType: 'json',
  //     contentType: 'application/json;charset=utf-8'
  //   });
  // };

  // On-click events, triggers
  // =============================================================
  // $('#submit').on('click', async (event) => {
  //   event.preventDefault();
  //   const response = await makePutCall('/api/createUserCategories', userData);
  //   console.log(response);
  // });

  $('#submit').on('click', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    const userData = {
      first_nm: $('#firstname').val().trim(),
      last_nm: $('#lastname').val().trim(),
      selectedCategories
    };

    // Send the PUT request.
    $.ajax('/api/createUserCategories', {
      type: "PUT",
      data: userData
    }).then(
      function() {
        console.log("test");
      }
    );
  });

  $('.category').on('click', function () {
    const categoryName = $(this).find('h6').text();
    let categoryId = $(this).find('span').text();
    categoryId = parseInt(categoryId);
    selectedCategories.push({
      categoryId,
      categoryName
    });
    console.log(selectedCategories);
  });

//   $('.parent').each(function() {
//     data.push({
//         'name': $(this).children('.childOne').text(),
//         'number': $(this).children('.childTwo').text()
//     });
// });
}); // end doc ready statement

// // functions
// function handleAddCategory() {
//   const id = $(this).attr('id');
//   $.ajax({
//     method: 'PUT',
//     url: '/api/category/add/' + id
//   }).then((responseData) => {
//     console.log(responseData);
//   });
// }

// // Submits a new user to the database
// function handleCreateUser() {
//   const first_nm = $('#first_nm').val();
//   const last_nm = $('#last_nm').val();
//   const newUser = {
//     first_nm,
//     last_nm
//   };
//   // shoudl this be a put request?
//   $.post('/api/createUserCategories', newUser, () => {
//     console.log('res received');
//   });
// }

// // on click events
// $(document).on('click', '#3', handleAddCategory);
// $(document).on('click', '#create', handleCreateUser);
// // $(document).on('click', '#createUserAssociateCategories', functionName);