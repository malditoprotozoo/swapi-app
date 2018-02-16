const getInfo = text => {
  $('#modal .row').html(`<div id='loader'><img src='assets/img/stormtrooper.gif'></div>`);
  $('#modal .modal-title').html('');
  const response = fetch(`https://swapi.co/api/people/?search=${text}`);
  response
    .then(data => data.json())
    .then(data => {
      if (data.count !== 0) {
        postInfoModal(data.results);
        $('#modal').modal('show');
      } else if (data.count === 0) {
        if (checkName(text) === undefined) {
          noData();
          $('#modal').modal('show');
        } else {
          getInfoOutApi(checkName(text));
          $('#modal').modal('show');
        }
      }
    });
};

const postInfo = (data) => {
  let results = data.map((obj) => {
    $('#result-container').append(`<h2>${obj.name}</h2>`);
  });
};

const getInfoModal = text => {
  const response = fetch(`https://swapi.co/api/people/?search=${text}`);
  response
    .then(data => data.json())
    .then(data => postInfoModal(data.results));
};

const postInfoModal = (data) => {
  let results = data.map((obj) => {
    let planet;
    let species;
    let len = data.length;
    const speciesResponse = fetch(`${obj.species}`);
    speciesResponse
      .then(data => data.json())
      .then(data => {
        species = data.name;
        const planetResponse = fetch(`${obj.homeworld}`);
        planetResponse
          .then(data => data.json())
          .then(data => {
            planet = data.name;
            $('#modal .row').html(`<div class='col-sm'></div>`);
            if (len > 1) {
              $('#modal .row .col-sm').append(`<div class="alert alert-warning" role="alert">
              There are too many results for this search. Please try again with more specific keywords.
              </div>`);
            };
            $('#modal .modal-title').html(`${obj.name}`);
            $('#modal .row .col-sm').append(`<p><span class='description'>Height:</span> ${obj.height}</p>`);
            $('#modal .row .col-sm').append(`<p><span class='description'>Hair Color:</span> ${obj['hair_color']}</p>`);
            $('#modal .row .col-sm').append(`<p><span class='description'>Skin Color:</span> ${obj['skin_color']}</p>`);
            $('#modal .row .col-sm').append(`<p><span class='description'>Mass:</span> ${obj.mass}</p>`);
            $('#modal .row .col-sm').append(`<p><span class='description'>Eye Color:</span> ${obj['eye_color']}</p>`);
            $('#modal .row .col-sm').append(`<p><span class='description'>Birth Year:</span> ${obj['birth_year']}</p>`);
            $('#modal .row .col-sm').append(`<p><span class='description'>Gender:</span> ${obj.gender}</p>`);
            $('#modal .row .col-sm').append(`<p><span class='description'>Homeworld:</span> ${planet}</p>`);
            $('#modal .row .col-sm').append(`<p><span class='description'>Species:</span> ${species}</p>`);
          });
      });
  });
};

const checkName = text => {
  let textLow = text.toLowerCase();
  for (let i = 0; i < characters.length; i++) {
    let name = characters[i].name.toLowerCase();
    let nick = characters[i].nickname.toLowerCase();
    if (name.includes(textLow) || nick.includes(textLow)) {
      return characters[i].name;
    }
  }
  return undefined;
};

const getInfoOutApi = text => {
  characters.map((obj) => {
    if (obj.name.includes(text) === true) {
      $('#modal .row').html(`<div class='col-sm'></div>`);
      $('#modal .modal-title').html(`${obj.name}`);
      $('#modal .row .col-sm').append(`<p><span class='description'>Height:</span> ${obj.height}</p>`);
      $('#modal .row .col-sm').append(`<p><span class='description'>Hair Color:</span> ${obj['hair_color']}</p>`);
      $('#modal .row .col-sm').append(`<p><span class='description'>Skin Color:</span> ${obj['skin_color']}</p>`);
      $('#modal .row .col-sm').append(`<p><span class='description'>Mass:</span> ${obj.mass}</p>`);
      $('#modal .row .col-sm').append(`<p><span class='description'>Eye Color:</span> ${obj['eye_color']}</p>`);
      $('#modal .row .col-sm').append(`<p><span class='description'>Birth Year:</span> ${obj['birth_year']}</p>`);
      $('#modal .row .col-sm').append(`<p><span class='description'>Gender:</span> ${obj.gender}</p>`);
      $('#modal .row .col-sm').append(`<p><span class='description'>Homeworld:</span> ${obj.homeworld}</p>`);
      $('#modal .row .col-sm').append(`<p><span class='description'>Homeworld:</span> ${obj.species}</p>`);
    };
  });
};

const noData = () => {
  $('#modal .row').html(`<div class='col-sm'></div>`);
  $('#modal .modal-title').html(`Hey!`);
  let errorMsg = `<div class="alert alert-danger" role="alert">These Are Not the Characters You Are Looking For...</div>`;
  $('#modal .col-sm').append(errorMsg);
}