var slides = document.querySelectorAll('.slides .slide');
var dots = document.querySelectorAll('#dot-align .fa-circle');
var currentSlide = 0;

function stopAnimation() {
    clearTimeout(animation);
}
function playAnimation() {
    setTimeout(nextSlide, 5000);
}

var animation = playAnimation()

function nextSlide() {

    goToSlide(currentSlide+1);
    stopAnimation(animation);
}

function previousSlide() {

    goToSlide(currentSlide-1);
    stopAnimation(animation);
}

function goToSlide(n) {
    
    slides[currentSlide].className = 'slide';
    dots[currentSlide].className = "far fa-circle";
    currentSlide = (n+slides.length)%slides.length;
    slides[currentSlide].className = 'slide active';
    dots[currentSlide].className = "fas fa-circle";
}

document.addEventListener("keydown", function(e) {

    clearInterval(animation);
    if (e.which = 37) {
        nextSlide();
    } else if(e.which = 39) {
        previousSlide();
    }
    e.preventDefault();
})