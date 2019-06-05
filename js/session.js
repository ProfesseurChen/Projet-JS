class Session {
  construct(objet) {
    this.dataObject = objet;
    thi.stationTitle = document.querySelector('#station-title.subtitle');
    this.stationNom = document.querySelector('#station-nom.subtitle');
    this.stationTimer = document.querySelector('#station-timer.subtitle');
    this.blockResa = document.querySelector('#resa-block-session.hero.is-primary');
  }

  initStorage() {
    const myResaObject = JSON.stringify(this.dataObject);
    sessionStorage.setItem("objet", myResaObject);
  }

  getMyStorage() {
    this.stationTitle.innerHTML = 'Bravo votre location vous attend à la station: ' + recup.station;
    this.stationNom.innerHTML = 'Au nom de: ' + recup.nom + ' ' + recup.prenom;
    this.stationTimer.innerHTML = "Vous avez 20 minutes pour aller le chercher !";
  }
  endStorage() {
    this.stationNom.style.display = "none";
    this.stationTimer.style.display = "none";
    this.stationTitle.innerHTML = 'Votre réservation a été annulé ! Vous pouvez en refaire une autre en sélectionnant la station qui vous convient';
    this.sessionStorage.clear();
  }
}