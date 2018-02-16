$(document).ready(function() {
  $('#search-btn').click(function() {
    event.preventDefault();
    let text = $('#search-bar').val();
    if ($('#search-bar').val().trim().length !== 0) {
      getInfo(text);
      $('#search-bar').val('');
    }
  });

  $('#search-bar').keyup(function(e) {
    if (e.keyCode === 13 && $('#search-bar').val().trim().length !== 0) {
      let text = $('#search-bar').val();
      getInfo(text);
      $('#search-bar').val('');
    };
  });

  $('.character').click(function() {
    $('#modal .row').children().remove();
    let text = $(this).attr('alt');
    getInfo(text);
    $('#modal').modal('show');
  });
});