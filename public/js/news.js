$(document).ready(() => {
  // Variable Declaration
  // =============================================================
  let counter = 0;

  // On-click events, triggers
  // =============================================================
  $('#submit').on('click', function(event) {
    // Make sure to preventDefault on a submit event
    event.preventDefault();
    window.location.replace('/articles/feed');
  });

  $('#init').on('click', function () {
    $.get('/admin/categories').done(() => {
      window.location.replace('/admin/categories');
    });
  });

  $('.save').on('click', function () {
    $(this).hide(600);
    if ($(this).hasClass('save')) {
      $(this).removeClass('save');
      const source_nm = $(this).prev().children('#source_nm').text();
      const title = $(this).prev().children('#title').text();
      const description = $(this).prev().children('#description').text();
      const url = $(this).prev().prev('#url').attr('href');
      const urlToImage = $(this).prev().prev().children('#urlToImage').attr('src');
      const publishedAt = $(this).prev().children('#publishedAt').text();

      const articleData = {
        source_nm,
        title,
        description,
        url,
        urlToImage,
        publishedAt
      };
      $.ajax('/admin/save', {
        type: 'POST',
        data: articleData
      });
    }
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
