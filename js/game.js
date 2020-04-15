// JavaScript Document

$(document).ready(function () {
  let searchParams = new URLSearchParams(window.location.search);

  if (searchParams.has('id')) {
    getInformation(searchParams.get('id'));
  } else {
    window.location = 'index';
  }

});


function getInformation(slug) {
  axios.get('https://api.rawg.io/api/games/' + slug).then(function (response) {


    let output = 
        
        
        `<div class="row">
                <div class="col-md-5"> 
                    <img class="img-thumbnail border-0" src="${response.data.background_image}" alt="Game Image">
                    <h3 class="text-center p-3">${response.data.name}</h3>
                  </div>
                  <div class="col-md">
                        <div class="well bg-secondary rounded text-light" style="font-size: 1rem;">
                        <p>${response.data.description}</p>
                        
                        </div>
                </div>
        </div>
        <div class="row">
            <div class"col-md">
                <img class="img-thumbnail border-0" src="${response.data.background_image_additional}" alt="Game Secondary Image">
            </div>
        </div>

`;

    $('#details').html(output);

    //$('#title').text(response.data.name).addClass('w3-animate-opacity');

    //$('#gameImg').addClass('img-thumbnail border-0 w3-animate-opacity');
    //$('#gameImg').attr('src', response.data.background_image);

  }).catch(function (err) {
    window.location = 'index';
  });
}
