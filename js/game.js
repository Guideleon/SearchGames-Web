// JavaScript Document

$(document).ready(function () {
    let searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has('id')) {
        getInformation(searchParams.get('id'));
    } else {
        window.location = 'index.html';
    }

});




function getInformation(slug) {
    axios.get('https://api.rawg.io/api/games/' + slug).then(function (response) {


        $('#title').text(response.data.name).addClass('w3-animate-opacity');

        $('#gameImg').addClass('img-thumbnail border-0 w3-animate-opacity');
        $('#gameImg').attr('src', response.data.background_image);

    }).catch(function (err) {
        window.location = 'index.html';
    });
}
