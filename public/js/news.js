$(document).ready(() => {
// query selectors
  // const first_nm = $('#first_nm').val();
  // const last_nm = $('#last_nm').val();
  // const country_cd = $('#country_cd').val().trim();

  // functions
  function handleAddCategory() {
    const id = $(this).attr('id');
    $.ajax({
      method: 'PUT',
      url: '/api/category/add/' + id
    }).then((responseData) => {
      console.log(responseData);
    });
  }

  // Submits a new user to the database
  function handleCreateUser() {
    const first_nm = $('#first_nm').val();
    const last_nm = $('#last_nm').val();
    const newUser = {
      first_nm: first_nm,
      last_nm: last_nm
      // country_cd
    };
    $.post('/api/user/create/', newUser, () => {
      console.log('res received');
    });
  }

  // on click events
  $(document).on('click', '#3', handleAddCategory);
  $(document).on('click', '#create', handleCreateUser);
  $(document).on('click', '#createUserAssociateCategories', functionName);

}); // end doc ready statement
