///// SLIDER //////

const sliderElt = new SliderTest();
const pauseButton = document.getElementById('pause');

const intervalId = sliderElt.animationSlide();
pauseButton.addEventListener('click', function() {
    clearTimeout(intervalId);
});

const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const playButton = document.getElementById('play');


nextButton.addEventListener('click', function() {
    sliderElt.nextSlide();
});
prevButton.addEventListener('click', function() {
    sliderElt.previousSlide();
});
playButton.addEventListener('click', function() {
    sliderElt.playAnimation();
});

document.addEventListener("keydown", function(e) {
    if (e.keyCode === 39) {
        sliderElt.nextSlide();
    }
    if (e.keyCode === 37) {
        sliderElt.previousSlide();
    }
})

////// MAP ( bike.js pour le détail des stations) /////

let markerClusters;
const buttonElt = document.querySelector(".button.is-link");
function initMap() {
    // var iconRel = 'http://localhost:8888/public/pics/'; 
    const mymap = L.map('map').setView([45.756725, 4.839532], 12.6);
    markerClusters = L.markerClusterGroup();
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWF0ZmFsY29uIiwiYSI6ImNqdmdxcWYwdjAydzA0NHAwc29nNXVkbWcifQ.0iKn3sVfP7fC-bkr7_QsZQ', {
        minZoom: 0,
        maxZoom: 25,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=d98e6733449ff8f55e78cc226c94dea8aa699f7a", function getInfos(reponse) {
        const request = JSON.parse(reponse);
        request.forEach(function(n) {
            const marker = L.marker([n.position.lat, n.position.lng]);
            markerClusters.addLayer(marker); 
            /* var myIcon = L.icon({
                iconUrl: iconRel + "bike.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50],
                popupAnchor: [-3, -76],
            }); */
            let popUpContent;
            const data = {
                name: n.name.substring(7),
                address: n.address,
                nbBikes: n.available_bikes,
                nbStands: n.available_bike_stands,
                status: n.status
            }
            const mapElt = new Bike(data);
            /* marker.bindPopup(popUpContent);   */    
            marker.addEventListener('click', function(e) {
                document.getElementById('select-station').style.display = "none";
                mapElt.getInfosBike();
            })
        });
    });  
    mymap.addLayer(markerClusters);
}

//// LOCALSTORAGE   ////

const formElt = document.querySelector('form');

const recupArray = sessionStorage.getItem("objet");

if(recupArray !== 0) {
    console.log(recupArray);
    const recup = JSON.parse(this.recupArray);
    sessionElt.getMyStorage();  
} else {
    console.log('C\'est vide');
}

formElt.addEventListener('submit', function(e) {
    const maResa = {
        nom: this.elements.nom.value,
        prenom: this.elements.prenom.value,
        station: this.elements.station.value
    }
    const sessionElt = new Session(maResa);
    sessionElt.initStorage(maResa);
    e.preventDefault();
})

const clearSession = document.querySelector('#clear-this-session.button.is-danger.is-inverted');
clearSession.addEventListener('click', function() {
    sessionElt.endStorage();
});



///// AU CHARGEMENT /////

window.onload = function() {
    initMap();
}