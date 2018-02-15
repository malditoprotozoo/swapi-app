$(document).ready(function() {
  $('#btn-search').click(function() {
    event.preventDefault();
    let text = $('#input-search').val();
    getInfo(text);
    $('#input-search').val('');
  });
  $('.character').click(function() {
    let text = $(this).attr('alt');
    getInfoModal(text);
  })
});


const getInfo = (text) => {
  const response = fetch(`https://swapi.co/api/people/?search=${text}`);
  response
    .then(data => data.json())
    .then(data => postInfo(data.results));
};

const postInfo = (data) => {
  let results = data.map((obj) => {
    $('#result-container').append(`<h2>${obj.name}</h2>`);
  });
};

const postInfoModal = data => {
  let results = data.map((obj) => {
    alert(obj.name + ' ' + obj['hair_color']);
  });
};

const getInfoModal = (text) => {
  const response = fetch(`https://swapi.co/api/people/?search=${text}`);
  response
    .then(data => data.json())
    .then(data => postInfoModal(data.results));
};