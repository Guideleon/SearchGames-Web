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

        document.title = response.data.name + " - Search Games";

        let output =
            `
        <div class="row">
            <div class="col-md-5">
                <h3 class="text-center p-3">${response.data.name}</h3>
                <img class="img-thumbnail border-0" src="${response.data.background_image}" alt="Game Image">
            </div>
            <div class="col-md">
                <ul>
                    <li> Teste </li>
                    <li> Teste </li>
                    <li> Teste </li>
                </ul>
            </div>
        </div>
        <hr class="my-4">
        <div class="row">
            <div class="col-md">
                <h4 class="pb-2">Description</h4>
                <p>${response.data.description}</p>
            </div>
        </div>`;

        $('#details').html(output);

    }).catch(function (err) {
        window.location = 'index';
    });
}
