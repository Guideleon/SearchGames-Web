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


        let stores = '';
        let canBuy = false;
        if (response.data.stores != '') {
            canBuy = true;
            $.each(response.data.stores, (index, store) => {
                stores += `<a href="${store.url}" class="list-group-item list-group-item-action list-group-item-primary">${store.store.name}</a>`;
            })
        }


        let output =
            `
        <div class="row">
            <div class="col-md-8 offset-4 mx-auto ">
                <h3 class="pb-2">${response.data.name}</h3>
                <img class="img-thumbnail" src="${response.data.background_image}" alt="Game Image">
                
                <div class="row">
                    
                    <div class="col-md">
                        
                        <ul class="list-group pt-4">
                            <h6 class="text-center">Genres</h6>
                            ${returnInformation(response.data.genres,'li','class="list-group-item"','data.name')}
                        </ul>
                    </div>
                    <div class="col-md">
                        <ul class="list-group pt-4">
                            <h6 class="text-center">Platforms</h6>
                            ${returnInformation(response.data.parent_platforms,'li','class="list-group-item"','data.platform.name')}
                        </ul>
                    </div>
                </div>

            </div>
            
        </div>
        <hr class="my-4">
        <div class="row">
            <div class="col-md">
                <h4 class="pb-2">Description</h4>
                <p>${response.data.description}</p>
                
                
            </div>
            ${(canBuy ? `<div class="col-md"><h4 class="pb-2">Buy now</h4> <div class="list-group">${stores}</div></div>`: '')}
        
        </div>
        <hr/>
        <div class="row">
            <div class="col-md">
                ${(response.data.ratings != '' ? `<h4 class="pb-2">Rating</h4>
                <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" style="width: ${response.data.ratings[0].percent}%" aria-valuenow="${response.data.ratings[0].percent}" aria-valuemin="0" aria-valuemax="100"></div>
                    <div class="progress-bar" role="progressbar" style="width: ${response.data.ratings[1].percent}%" aria-valuenow="${response.data.ratings[1].percent}" aria-valuemin="0" aria-valuemax="100"></div>
                    <div class="progress-bar bg-warning" role="progressbar" style="width: ${response.data.ratings[2].percent}%" aria-valuenow="${response.data.ratings[2].percent}" aria-valuemin="0" aria-valuemax="100"></div>
                    <div class="progress-bar bg-danger" role="progressbar" style="width: ${response.data.ratings[3].percent}%" aria-valuenow="${response.data.ratings[3].percent}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>`: '')}
                
            </div>
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
