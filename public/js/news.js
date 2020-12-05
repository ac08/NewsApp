$(document).ready(() => {
  // Variable Declaration
  // =============================================================
  const selectedCategories = [];
  let counter = 0;

  // Function Declaration
  // =============================================================
  function getArticles() {
    const categoryNames = selectedCategories.map(function(categoryData) {
      return categoryData.categoryName;
    });
    console.log(categoryNames);
    categoryNames.forEach((category) => {
      $.ajax('/api/articles', {
        type: 'PUT',
        data: category
      }).then((data) => {
        // res.render here...
        console.log(data);
      });
    });
  }

  // On-click events, triggers
  // =============================================================
  $('#submit').on('click', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    // could add some validation on the on click event to ensrue names are entered
    const userData = {
      first_nm: $('#firstname').val().trim(),
      last_nm: $('#lastname').val().trim(),
      selectedCategories
    };

    // Send the PUT request.
    $.ajax('/api/createUserCategories', {
      type: 'PUT',
      data: userData
    }).then(getArticles);
  });

  $('.category').on('click', function () {
    $(this).find('h6').css('color', 'green');
    counter++;
    $('#counter').html(counter);

    const categoryName = $(this).find('h6').text();
    let categoryId = $(this).find('span').text();
    // could add some validation to make sure dups aren't entered into the array
    categoryId = parseInt(categoryId);
    selectedCategories.push({
      categoryId,
      categoryName
    });
  });
}); // end document ready function
