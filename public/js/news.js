$(document).ready(() => {
  // Variable Declaration
  // =============================================================
  let counter = 0;

  // Function Declaration
  // =============================================================

  // On-click events, triggers
  // =============================================================
  $('#submit').on('click', function(event) {
    // Make sure to preventDefault on a submit event
    event.preventDefault();
    $.get('/articles/feed').done(() => {
      window.location.replace('/articles/feed');
    });
  });

  $('#init').on('click', function () {
    $.get('/admin/categories').done(() => {
      window.location.replace('/admin/categories');
    });
  });

  $('.category').on('click', function () {
    if ($(this).hasClass('category')) {
      $(this).removeClass('category');
      counter++;
      $('#counter').html(counter);
      const categoryId = $(this).find('span').text();
      $(this).find('h6').css('color', 'green');
      // Send the PUT request
      $.ajax('/admin/usercategories', {
        type: 'PUT',
        data: { categoryId }
      });
    }
  });
}); // end document ready function
