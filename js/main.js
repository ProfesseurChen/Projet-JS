//////////////////  SLIDER  ////////////////

const sliderElt = new SliderTest();
const playButton = document.getElementById('play');
const pauseButton = document.querySelector('#pause.btn-slider');


let animation;

//// INITIALISATION AUTOMATIQUE DU SLIDER ////

animation = setInterval(function() {sliderElt.nextSlide()}, 5000);

//// EVENTS BOUTONS ///


const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');


nextButton.addEventListener('click', function() {
    sliderElt.nextSlide();
});
prevButton.addEventListener('click', function() {
    sliderElt.previousSlide();
});

playButton.addEventListener('click', function() {
    setInterval(function() {animation = sliderElt.nextSlide()}, 5000);
})
pauseButton.addEventListener('click', function() {
    clearInterval(animation);
})

//// KEY EVENTS ///
document.addEventListener("keydown", function(e) {
    if (e.keyCode === 39) {
        sliderElt.nextSlide();
    }
    if (e.keyCode === 37) {
        sliderElt.previousSlide();
    }
})

////// MAP ( bike.js pour le détail des stations) /////

let markerClusters, statusStation, iconRel;
const buttonElt = document.querySelector(".button.is-link");

function initMap() {
    
    const mymap = L.map('map').setView([45.756725, 4.839532], 12.6);
    markerClusters = L.markerClusterGroup();
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWF0ZmFsY29uIiwiYSI6ImNqdmdxcWYwdjAydzA0NHAwc29nNXVkbWcifQ.0iKn3sVfP7fC-bkr7_QsZQ', {
        minZoom: 0,
        maxZoom: 20,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=d98e6733449ff8f55e78cc226c94dea8aa699f7a", function getInfos(reponse) {

        const request = JSON.parse(reponse);

        ///// POUR CHAQUE STATION, ON RECUPERE LES INFOS //////

        request.forEach(function(n) {
            
            if (n.available_bikes > 1 && n.status === 'OPEN') {
                iconRel = 'http://projectpallet.fr/p3/public/pics/bike-open.png';
            } else if (n.available_bikes === 1 && n.status === 'OPEN') {
                iconRel = 'http://projectpallet.fr/p3/public/pics/bike-one.png';
            } else {
                iconRel = 'http://projectpallet.fr/p3/public/pics/bike-none.png';
            }

            /// TABLEAU DES STATIONS ///

            const data = {
                name: n.name.substring(7),
                address: n.address,
                nbBikes: n.available_bikes,
                nbStands: n.available_bike_stands,
                status: n.status
            }

            //// GESTION DES STATIONS ////

            const mapElt = new Bike(data,iconRel,n.position.lat,n.position.lng,markerClusters);
            const mapIconElt = mapElt.initIcon();

            mapIconElt.addEventListener('click', function(e) {
                document.getElementById('select-station').style.display = "none";
                mapElt.getInfosBike();
            })
        });
    });  
    mymap.addLayer(markerClusters);
}

////////////// RESERVATION /////////////

let getNom, getPrenom, getStation, getTime, distance, x, timerElt, canvasElt, canvasBlc;
const reservationElt = document.getElementById('resa-block-session');
const inputDisabledBooking = document.getElementById("button-sign");
const inputDisabledSign = document.getElementById("input-booking");

inputDisabledBooking.disabled = true;
inputDisabledSign.disabled = true;


function timer(getTime,getNom,getPrenom,getStation) {

    timerElt = new Timer(getTime);
    initReservation(getNom,getPrenom,getStation);

    x = setInterval(function() {

        timerElt.initTimer();
        const distanceElt =  timerElt.initTimer();

        if (distanceElt < 0) {

            clearInterval(x);
            timerElt.resetTimer();
        }
    }, 1000);
}

/// APPARITION DE LA SIGNATURE ///

const getSign = document.getElementById('button-sign');
const sign = document.getElementById('go-to-sign');
canvasElt = new Signature();
getSign.addEventListener('click', function (e) {

    canvasElt.initCanvas();
    sign.style.display = "block";
    this.style.display = "none";
    e.preventDefault();
})


/// ON SUBMIT, ON UTILISE WEBSTORAGE ET ON INITIALISE LA RESERVATION ///
const formElt = document.querySelector('form');
formElt.addEventListener('submit', function(e) {
   
    getNom = this.elements.nom.value;
    getPrenom = this.elements.prenom.value;
    getStation = this.elements.station.value;

    localStorage.setItem("nom", getNom);
    localStorage.setItem("prenom", getPrenom);
    sessionStorage.setItem("station", getStation);
    getTime = new Date().getTime() + (1000 * 60 * 20);
    sessionStorage.setItem("time", getTime);

    canvasElt.clearCanvas();
    sign.style.display = "none";
    getSign.style.display = "block";
    getSign.disabled = true;
    document.getElementById('input-booking').disabled = true;

    
    timer(getTime,getNom,getPrenom,getStation);

    clearButton.addEventListener('click', function() {
        
        timerElt.resetTimer();
        clearInterval(x);
    })
    e.preventDefault();
})

//// SI ON VALIDE /////

function initReservation(nom,prenom,station) {

    reservationElt.style.display = "block";
    document.getElementById('station-message').innerHTML = 'Bravo ! Votre vélo vous attend station: ' + station + ' au nom de ' + prenom + ' ' + nom;
}


///// AU CHARGEMENT ON VERIFIE SI LE VISITEUR A DEJA FAIT UNE RESERVATION /////

const clearButton = document.querySelector('#clear-this-session');
const inputName = document.getElementById('input-name');
const inputSurname = document.getElementById('input-surname');

if(typeof localStorage !== 'undefined') {
    if('nom' in localStorage && 'prenom' in localStorage) {

        // Si le visiteur a déjà réservé
        getNom = localStorage.getItem('nom');
        getPrenom = localStorage.getItem('prenom');

        if('station' in sessionStorage && 'time' in sessionStorage) {

            // Si le visiteur a déjà réservé et que le navigateur n'a pas été fermé

            getTime = sessionStorage.getItem('time');
            getStation = sessionStorage.getItem('station');

            timer(getTime,getNom,getPrenom,getStation);
            clearButton.addEventListener('click', function() {
                timerElt.resetTimer();
                clearInterval(x);
            })
        }   
        inputName.value = getNom;
        inputSurname.value = getPrenom;  
    }
}

window.onload = function() {
    initMap();
}