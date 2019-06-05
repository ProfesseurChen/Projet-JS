// Récupération des informations des stations et gestion des évènements de disponibilités

class Bike {
    constructor(data) {
    this.containerBooking = document.getElementById('elts-booking');
    this.nameElt = document.getElementById('name-station');
    this.addressElt = document.getElementById('address-station');
    this.statusElt = document.getElementById('status-station');
    this.availabilityBikeElt = document.getElementById('bike-station');
    this.availabilityStandElt = document.getElementById('stand-station');
    this.canvasElt = document.getElementById("bloc-signature");
    this.buttonElt = document.querySelector(".button.is-success");
    this.stationElt = document.querySelector('input#name-station');
    this.data = data;
    }

    getInfosBike() {
        this.nameElt.innerHTML = this.data.name;
        this.stationElt.value = this.data.name;
        if (this.data.status == 'CLOSED' ) { 
            this.statusElt.className = 'closed';
            this.statusElt.innerHTML = 'Station fermée !';
            this.buttonElt.disabled = true;
        } else {
            this.statusElt.className = 'open';
            this.statusElt.innerHTML = 'Station ouverte.';
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
            this.availabilityBikeElt.className = 'closed';
            this.availabilityBikeElt.innerHTML= 'Il n\'y a plus de vélos disponibles. Veuillez réessayez ou choisir une autre station.';
            this.buttonElt.disabled = true;
        } else {
            this.availabilityBikeElt.className = 'open';
            this.stationElt.value = this.data.name;
            if(this.data.nbBikes == 1) {
                this.availabilityBikeElt.innerHTML = 'Il y a encore <strong>' + this.data.nbBikes + '</strong> vélo de disponible !';
            } else {
                this.availabilityBikeElt.innerHTML = 'Il y a <strong>' + this.data.nbBikes + '</strong> vélos de disponibles.';
            }
            this.buttonElt.className = 'button is-success activeButton ';
            this.buttonElt.disabled = false;
        }
    }
}