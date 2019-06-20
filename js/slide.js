class SliderTest {
    constructor() {
        this.slides = document.querySelectorAll('.slides .slide');
        this.dots = document.querySelectorAll('#dot-align .fa-circle');
        this.currentSlide = 0;
    }

    goToSlide(n) {
        this.slides[this.currentSlide].className = 'slide';
        this.dots[this.currentSlide].className = "far fa-circle";
        this.currentSlide = (n+this.slides.length)%this.slides.length;
        this.slides[this.currentSlide].className = 'slide active';
        this.dots[this.currentSlide].className = "fas fa-circle";
    }
    nextSlide() {
        this.goToSlide(this.currentSlide+1);   
    }
    
    previousSlide() {
        this.goToSlide(this.currentSlide-1);
    }

} 