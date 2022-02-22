// const constmap = L.map('mapid').setView([-22.9193857,-47.1044369], 17);
//////////////////////////////////////////////console.log(constmap)

 //a funcao precisa carregar a view que eh a localizacao na tela. e tambem
 //precisa carregar o marker que eh o ponto no mapa,devem estar sincronizados

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(constmap);

//////////////////////////////////////////////L.marker([NUMERO_LAT, NUMERO_LAT]).addTo(map)
// L.marker([-22.9193857,-47.1044369]).addTo(constmap)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();






////////////////////////////////////////////// https://nominatim.openstreetmap.org/search.php?q=Rua+Ant%C3%B4nio+Rodrigues+Moreira+Neto+Campinas+Sao+Paulo+Brazil&format=jsonv2





// constmap.on("click", pegaLatLng => {
//     const {lat,lng} = pegaLatLng.latlng
//     console.log(lat,lng)
// })





////////////////////////////////////////////////////////////

//constante do botao pesquisar
const searchInput = document.getElementById('search');
//constante da lista de resultados
const resultList = document.getElementById('result-list');
//constante do elemento mapa
const mapContainer = document.getElementById('map-container');
//constante filhas dos
const currentMarkers = [];

const map = L.map(mapContainer).setView([-22.9193857,-47.1044369], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

document.getElementById('search-button').addEventListener('click', () => {
    const query = searchInput.value;
    fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + query)
        .then(result => result.json())
        .then(parsedResult => {
            setResultList(parsedResult);
        });
});

function setResultList(parsedResult) {
    resultList.innerHTML = "";
    for (const marker of currentMarkers) {
        map.removeLayer(marker);
    }
    map.flyTo(new L.LatLng(-22.9193857,-47.1044369), 2);
    for (const result of parsedResult) {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'list-group-item-action');
        li.innerHTML = JSON.stringify({
            displayName: result.display_name,
            lat: result.lat,
            lon: result.lon
        }, undefined, 2);
        li.addEventListener('click', (event) => {
            for(const child of resultList.children) {
                child.classList.remove('active');
            }
            event.target.classList.add('active');
            const clickedData = JSON.parse(event.target.innerHTML);
            const position = new L.LatLng(clickedData.lat, clickedData.lon);
            map.flyTo(position, 10);
        })
        const position = new L.LatLng(result.lat, result.lon);
        currentMarkers.push(new L.marker(position).addTo(map));
        resultList.appendChild(li);
    }
}
