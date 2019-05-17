function bookingBike(data) {
    var containerBooking = document.getElementById('elts-booking');
    var nameElt = document.getElementById('name-station');
    var addressElt = document.getElementById('address-station');
    var statusElt = document.getElementById('status-station');
    var availabilityBikeElt = document.getElementById('bike-station');
    var availabilityStandElt = document.getElementById('stand-station');
    var buttonElt = document.querySelector(".button.is-link");
    nameElt.innerHTML = data.name;
    if (data.status == 'CLOSED' ) { 
        statusElt.className = 'closed';
        statusElt.innerHTML = 'Station fermée !';
        buttonElt.disabled = true;
    } else {
        statusElt.className = 'open';
        statusElt.innerHTML = 'Station ouverte.';
    }
    if(data.address == "") {
        addressElt.innerHTML = '';
    } else {
        addressElt.innerHTML = data.address;
    }
    if(data.nbStands == 0) {
        availabilityStandElt.className = 'closed';
        availabilityStandElt.innerHTML = 'Aucune place de disponible pour stationner la location de vélos. Faites attention !';
    } else {
        availabilityStandElt.className = 'open';
        if(data.nbStands == 1) {
            availabilityStandElt.innerHTML = 'Il reste une seule place pour stationner les vélos.';
        } else {
            availabilityStandElt.innerHTML = 'Il y a ' + data.nbStands + ' places pour stationner les vélos.';
        }
    }
    if(data.nbBikes == 0) {
        availabilityBikeElt.className = 'closed';
        availabilityBikeElt.innerHTML= 'Il n\'y a plus de vélos disponibles. Veuillez réessayez ou choisir une autre station.';
        buttonElt.disabled = true;
    } else {
        availabilityBikeElt.className = 'open';
        if(data.nbBikes == 1) {
            availabilityBikeElt.innerHTML = 'Il y a encore ' + data.nbBikes + ' vélo de Disponible !';
        } else {
            availabilityBikeElt.innerHTML = 'Il y a ' + data.nbBikes + ' vélos de disponibles.';
        }
        buttonElt.className = 'button is-link activeButton ';
        buttonElt.disabled = false;
    }
}
var markerClusters;
function initMap() {
    // var iconRel = 'http://localhost:8888/public/pics/'; 
    var mymap = L.map('map').setView([45.756725, 4.839532], 11);
    markerClusters = L.markerClusterGroup();
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWF0ZmFsY29uIiwiYSI6ImNqdmdxcWYwdjAydzA0NHAwc29nNXVkbWcifQ.0iKn3sVfP7fC-bkr7_QsZQ', {
        minZoom: 0,
        maxZoom: 25,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=d98e6733449ff8f55e78cc226c94dea8aa699f7a", function getInfos(reponse) {
         var request = JSON.parse(reponse);
        request.forEach(function(n) {
            var marker = L.marker([n.position.lat, n.position.lng]);
            markerClusters.addLayer(marker); 
            /* var myIcon = L.icon({
                iconUrl: iconRel + "bike.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50],
                popupAnchor: [-3, -76],
            }); */
            var popUpContent;
            var data = {
                name: n.name.substring(7),
                address: n.address,
                nbBikes: n.available_bikes,
                nbStands: n.available_bike_stands,
                status: n.status
            }
            /* marker.bindPopup(popUpContent);   */    
            marker.addEventListener('click', function(e) {
                bookingBike(data);
            })       
        });
    });  
    mymap.addLayer(markerClusters);
}
window.onload = function(){
    initMap();
};



    


