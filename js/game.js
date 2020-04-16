$(document).ready(function () {
    let searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has('id')) {
        getInformation(searchParams.get('id'));
    } else {
        window.location = 'index';
    }
    $('[data-toggle="tooltip"]').tooltip();
});


function getInformation(slug) {
    axios.get('https://api.rawg.io/api/games/' + slug).then(function (response) {

        document.title = response.data.name + " - Search Games";

        let stores = '';
        let canBuy = false;
        if (response.data.stores != '') {
            canBuy = true;
            $.each(response.data.stores, (index, store) => {
                stores += `<a href="${store.url}" target="_blank" class="list-group-item list-group-item-action list-group-item-primary">${store.store.name}</a>`;
            })
        }

        let ratingHtml = '';
        if (response.data.ratings != ''){
            $.each(response.data.ratings, (index, rating) => {
                let color = '';
                if (rating.title == 'exceptional'){
                    color = 'bg-success';
                } else if (rating.title ==  'recommended'){
                    color = '';
                } else if (rating.title == 'meh'){
                    color = 'bg-warning'
                } else if (rating.title == 'skip'){
                    color = 'bg-danger'
                }


                ratingHtml += `<div class="progress-bar ${color}" role="progressbar" data-toggle="tooltip" title="${rating.count}" style="width: ${rating.percent}%" aria-valuenow="${rating.percent}" aria-valuemin="0" aria-valuemax="100"></div>`;
            })
        }


        let output =
            `
        <div class="row">
            <div class="col-md-8 offset-4 mx-auto ">
                <p class="float-left h4">${response.data.name}</p>
                <p class="float-right">${response.data.rating} / ${response.data.rating_top}</p>
                <img class="img-thumbnail" src="${response.data.background_image}" alt="Game Image">
                
                <div class="row">
                    
                    <div class="col-md">
                        
                        <ul class="list-group pt-4">
                            <p class="text-center h6">Genres</p>
                            ${returnInformation(response.data.genres,'li','class="list-group-item"','data.name')}
                        </ul>
                    </div>
                    <div class="col-md">
                        <ul class="list-group pt-4">
                            <p class="text-center h6">Platforms</p>
                            ${returnInformation(response.data.parent_platforms,'li','class="list-group-item"','data.platform.name')}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
        <hr class="my-4">

        <div class="row">
            <div class="col-md">
                <p class="pb-2 h4">Description</p>
                <p>${response.data.description}</p>
                <a href="${response.data.website}" target="_blank">Official Website</a>
            </div>
            ${(canBuy ? `<div class="col-md"><p class="pb-2 h4">Buy now</p> <div class="list-group">${stores}</div></div>`: '')}

        </div>
        <hr class="my-4"/>
        <div class="row">
            <div class="col-md">
                ${(response.data.ratings != '' ? `<p class="pb-2 h4">Rating</p>
                <div class="progress">
                    ${ratingHtml}
                </div>`: '')}
                
            </div>
        </div>
        <div class="container p-3 my-4 border rounded text-center">
            <p class="h4">Screenshots</p>
            <div class="row"></div>
        </div>


        `;

        $('#details').html(output);

    }).catch(function (err) {
        //window.location = 'index';
    });
}

function returnInformation(datas, tag, body, evalString) {


    let output = '';
    $.each(datas, (index, data) => {
        output += `<${tag} ${body}>${eval (evalString)}</${tag}>`;
    })


    return output;
}
