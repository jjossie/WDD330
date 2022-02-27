let allTheShips = [];

function getShips(url) {

    let results = fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            allTheShips.push(...data.results);
            if (data.next != null) {
                getShips(data.next);
            }
            // console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
    return results;
    // console.log(allTheShips)
}

getShips("https://swapi.dev/api/starships/")
    .then(results => {
        console.log(allTheShips)
        return results
    })
    .then(results => {
        displayAllShips(allTheShips)
    });


function displayAllShips(shipsList) {
    let shipListHTML = document.getElementById("shipList");
    shipsList.forEach(ship => {
        let shipListItemHTML = document.createElement("li");
        shipListItemHTML.innerHTML = `
        ${ship.name}`;
        shipListItemHTML.addEventListener('click', event => {
            document.getElementById("shipDetails").innerHTML = renderOneShipFull(ship).innerHTML;
        })
        shipListHTML.appendChild(shipListItemHTML);
    });
}

function renderOneShipFull(ship){
    let shipListItemHTML = document.createElement("li");
    shipListItemHTML.innerHTML = `
    <h2>${ship.name}</h2>
    <em>${ship.model}<br>
    Passengers: ${ship.passengers}<br>
    Hyperdrive Rating: ${ship.hyperdrive_rating}<br>
    </em>`;
    return shipListItemHTML;
}

