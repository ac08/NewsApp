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
          const resultsRow = $('#results-row');
          const resultsCol = $('<div>').addClass('col-md-6');
          resultsCol.appendTo(resultsRow);
          const postRow = $('<div>').addClass('row border rounded overflow-hidden flex-md-row mx-1 mb-4 shadow-sm h-md-250 position-relative');
          postRow.appendTo(resultsCol);
          const postCol = $('<div>').addClass('article col p-4 d-flex flex-column position-static');
          postCol.appendTo(postRow);
          const postCategory = $('<strong>').addClass('d-inline-block mb-2 text-primary').html(element.source.name);
          const postTitle = $('<h3>').addClass('mb-0').html(element.title);
          const postDate = $('<div>').addClass('mb-1 text-muted').html(moment(element.publishedAt).format('MMM Do YY'));
          const postContent = $('<p>').addClass('card-text mb-auto').html(element.description);
          const postURL = $('<a>').addClass('stretched-link my-2').attr('href', element.url).attr('target', '_blank').html('Continue Reading');
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
    // also could add remove if already in it
    // $(this).find('h6').css('color', 'red');
    categoryId = parseInt(categoryId);
    selectedCategories.push({
      categoryId,
      categoryName
    });
  });
}); // end document ready function
