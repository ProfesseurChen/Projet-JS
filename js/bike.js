// Récupération des informations des stations et gestion des évènements de disponibilités
class Bike {

    constructor(data,iconRel,lat,long,markerClusters) {
    this.containerBooking = document.getElementById('elts-booking');
    this.nameElt = document.getElementById('name-station');
    this.addressElt = document.getElementById('address-station');
    this.statusElt = document.getElementById('status-station');
    this.availabilityBikeElt = document.getElementById('bike-station');
    this.availabilityStandElt = document.getElementById('stand-station');
    this.canvasElt = document.getElementById("bloc-signature");
    this.buttonElt = document.getElementById("button-sign");
    this.stationElt = document.querySelector('input#input-station');
    this.signBlockElt = document.getElementById('button-sign');
    this.signElt = document.getElementById('go-to-sign');
    this.data = data;
    this.iconRel = iconRel;
    this.lat = lat;
    this.long = long;
    this.cluster = markerClusters;
    }

    getInfosBike = () => {
        this.nameElt.innerHTML = "Station: " + this.data.name;
        this.stationElt.value = this.data.name;
        if (this.data.status == 'CLOSED' ) {
            this.removeSign(); 
            this.statusElt.className = 'closed';
            this.statusElt.innerHTML = '<span id="station-closed">Station fermée !</span>';
            this.buttonElt.disabled = true;
        } else {
            this.statusElt.className = 'open';
            this.statusElt.innerHTML = '<span id="station-open"> Station ouverte.</span>';
        }
        if(this.data.address == "") {
            this.addressElt.innerHTML = '';
        } else {
            this.addressElt.innerHTML = '<strong>Adresse: </strong>' + this.data.address;
        }
        if(this.data.nbStands == 0) {
            this.availabilityStandElt.className = 'closed';
            this.availabilityStandElt.innerHTML = 'Aucune place de disponible pour stationner la location de vélos. Faites attention !';
        } else {
            this.availabilityStandElt.className = 'open';
            if(this.data.nbStands == 1) {
                this.availabilityStandElt.innerHTML = 'Il reste une seule place pour stationner les vélos.';
            } else {
                this.availabilityStandElt.innerHTML = 'Il y a <strong>' + this.data.nbStands + '</strong> places pour stationner les vélos.';
            }
        }
        if(this.data.nbBikes == 0) {
            this.removeSign();
            this.availabilityBikeElt.className = 'closed';
            this.availabilityBikeElt.innerHTML= '<span id="station-closed">Il n\'y a plus de vélos disponibles.</span> Veuillez réessayez ou choisir une autre station.';
            this.buttonElt.disabled = true;
        } else {
            this.availabilityBikeElt.className = 'open';
            this.stationElt.value = this.data.name;
            this.buttonElt.disabled = false;
            if(this.data.nbBikes == 1) {
                this.availabilityBikeElt.innerHTML = 'Il y a encore <strong>' + this.data.nbBikes + '</strong> vélo de disponible !';
            } else {
                this.availabilityBikeElt.innerHTML = 'Il y a <strong>' + this.data.nbBikes + '</strong> vélos de disponibles.';
            }
            this.buttonElt.disabled = false;
        }
    }

    removeSign = () => {
        this.signElt.style.display = "none";
        this.signBlockElt.style.display = "block";
        this.signBlockElt.disabled = true;
    }

    initIcon = () => {

        const iconElt = L.icon({
            iconUrl: this.iconRel,
            iconSize: [40, 40],
            iconAnchor: [25, 50],
			popupAnchor: [-3, -76],
        });
        const marker = L.marker([this.lat, this.long], {icon: iconElt});
        this.cluster.addLayer(marker);
        return marker;
    }
}