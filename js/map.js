var mymap = L.map('map').setView([45.756725, 4.839532], 12);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWF0ZmFsY29uIiwiYSI6ImNqdmdxcWYwdjAydzA0NHAwc29nNXVkbWcifQ.0iKn3sVfP7fC-bkr7_QsZQ', {
    maxZoom: 28,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);