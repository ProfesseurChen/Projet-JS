class Timer {
    constructor(countDownDate) {
        this.countDownDate = countDownDate;
        this.stationMessage = document.getElementById('station-message');
        this.timerCount = document.getElementById("timer");
        this.buttonClear = document.getElementById('clear-this-session'); 
    }

    initTimer() {
        const now = new Date().getTime();
        const distance = this.countDownDate - now;
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const sec =  (seconds>=10) ? seconds : "0" + seconds;
        const min = (minutes>=10) ? minutes : "0" + minutes;
        this.timerCount.innerHTML = "Vous avez " + min + " min et " + sec + " secondes pour retirer votre location.";
        return distance;       
    }

    doneTimer() {
        this.stationMessage.innerHTML = 'Réservation annulée !'
        this.timerCount.innerHTML = 'Le temps a expiré ! Votre réservation a été annulée. Veuillez en retenter une autre.';
    }

    resetTimer() {
        sessionStorage.removeItem('time');
        sessionStorage.removeItem('station');
        this.buttonClear.style.display = "none";
        this.stationMessage.innerHTML = 'Vous avez annulé votre réservation !'
        this.timerCount.innerHTML = 'Vous pouvez recommencer votre réservation';
    }

}