var nextPage = '';

$(document).ready(function () {
    let searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has('search')) {
        searchGames(searchParams.get('search'));
    }

    $('#searchForm').on('submit', function (e) {
        let searchText = $('#searchText').val();
        var params = {
            search: searchText
        };
        let searchParams = new URLSearchParams(window.location.search)
        console.log(searchParams);
        var str = jQuery.param(params);
        searchGames(str)
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let options = {
        root: null,
        rootMargins: "0px",
        threshold: 0.5
    };
    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(document.querySelector("footer"));


    let searchParams = new URLSearchParams(window.location.search);

    if (!searchParams.has('search')) {
        getURLGames('https://api.rawg.io/api/games?dates=2019-10-10,2020-10-10&ordering=-added');
    }
});

function handleIntersect(entries) {
    if (entries[0].isIntersecting & nextPage != '') {
        getURLGames(nextPage);
    }
}

function getURLGames(URL) {
    axios.get(URL).then(function (response) {
        nextPage = response.data.next;

        let output = createCard(response);

        $('#games').append(output);
    }).catch(function (err) {
        console.log(err);
    });

}

function searchGames(searchText) {
    axios.get('https://api.rawg.io/api/games?search=' + searchText).then(function (response) {
        nextPage = response.data.next;

        let output = createCard(response);

        $('#games').html(output);
    }).catch(function (err) {
        console.log(err);
    });
}

function createCard(response) {
    let games = response.data.results;
    let output = '';
    $.each(games, (index, game) => {
        output += ` 
            <div class="col-md-3">
                <div class="card w3-animate-opacity">
                    <img class="card-img-top" src="${game.background_image}">
					<div class="card-body">
						<h5 class="card-title">${game.name}</h5>
						<!-- <p class="card-text">Lorem ipsum dolor sit amet</p> --> 
						<a class="btn btn-primary text-light btn-md" onclick="gameSelected('${game.slug}')">Game Details</a>
					</div>
                </div>
            </div>
            `;
    });
    return output;
}

function gameSelected(slug) {
    window.location = 'game' + '?id=' + slug;
    return false;
}
