function initMap() {

    // var iconRel = 'http://localhost:8888/public/pics/'; 
    var markCluster;
    var markers = [];
    markCluster = L.markerClusterGroup({
        iconCreateFunction: function(cluster) {
            return L.divIcon({ 
                html: cluster.getChildCount(), 
                className: 'mycluster', 
                iconSize: null 
            });
        }
    });

    var mymap = L.map('map').setView([45.756725, 4.839532], 12);
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWF0ZmFsY29uIiwiYSI6ImNqdmdxcWYwdjAydzA0NHAwc29nNXVkbWcifQ.0iKn3sVfP7fC-bkr7_QsZQ', {
        minZoom: 1,
        maxZoom: 20,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);

    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=d98e6733449ff8f55e78cc226c94dea8aa699f7a", function getInfos(reponse) {

        var request = JSON.parse(reponse);
    
        request.forEach(function(n) {
        
            var testLine = document.getElementById("infos");
            var ligne = document.createElement("li");
            ligne.className = "input";
            ligne.style.listStyle = "none";
            ligne.textContent = n.address;

            /* var myIcon = L.icon({
                iconUrl: iconRel + "bike.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50],
                popupAnchor: [-3, -76],
            }); */
    
            console.log(n.position);
            var marker = L.marker([n.position.lat, n.position.lng]).addTo(mymap);
            marker.bindPopup(
                n.name
            );
            markCluster.addLayer(marker);
            markers.push(marker);
            testLine.appendChild(ligne);
        });
        var group = new L.featureGroup(markers);
        mymap.fitBounds(group.getBounds().pad(2));
        mymap.addLayer(markCluster);
    });
}

window.onload = function(){

    // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
    initMap(); 
};



    


