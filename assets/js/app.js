$(document).ready(function() {

  $('#btn-search').click(function() {
    event.preventDefault();
    let text = $('#input-search').val();
    getInfo(text);
    $('#input-search').val('');
  });

  $('.character').click(function() {
    let text = $(this).attr('alt');
    getInfo(text);
  });
});