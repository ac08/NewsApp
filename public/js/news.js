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
    categoryNames.forEach((category) => {
      $.ajax('/api/articles', {
        type: 'PUT',
        data: category
      }).then((data) => {
        $('main').addClass('d-none');
        data.forEach((element) => {
          console.log(element);
          let resultsRow = $('#results-row');
          let resultsCol = $('<div>').addClass('col-md-6');
          resultsCol.appendTo(resultsRow);
          let postRow = $('<div>').addClass('row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative');
          postRow.appendTo(resultsCol);
          let postCol = $('<div>').addClass('col p-4 d-flex flex-column position-static');
          postCol.appendTo(postRow);
          let postCategory = $('<strong>').addClass('d-inline-block mb-2 text-primary').html(element.source.name);
          let postTitle = $('<h3>').addClass('mb-0').html(element.title);
          let postDate = $('<div>').addClass('mb-1 text-muted').html(moment(element.publishedAt).format("MMM Do YY"));
          let postContent = $('<p>').addClass('card-text mb-auto').html(element.description);
          let postURL = $('<a>').addClass('stretched-link').attr('href', 'element.url');
          postCol.append(postCategory, postTitle, postDate, postContent, postURL);
        });
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
