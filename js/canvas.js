class Signature {
    constructor() {
        this.canvas = document.getElementById("sig-canvas");
        this.ctx = this.canvas.getContext('2d');
        this.isEnabled = false;
        this.preX = 0;
        this.preY = 0;
        this.curX = 0;
        this.curY = 0;
    }

    initCanvas = () => {

        this.canvas.addEventListener("mousemove", this.canvasEvent, false);
        this.canvas.addEventListener("mousedown", this.canvasEvent, false);
        this.canvas.addEventListener("mouseup", this.canvasEvent, false);
        this.canvas.addEventListener("mouseout", this.canvasEvent, false);
        this.canvas.addEventListener("touchmove", this.canvasEvent, false);
        this.canvas.addEventListener("touchstart", this.canvasEvent, false);
        this.canvas.addEventListener("touchend", this.canvasEvent, false);
    }

    canvasEvent = e => {

        this.ctx.strokeStyle = "#343434";
        this.ctx.lineWidth = 3;
        
        if (e.type === 'mousedown' || e.type === 'touchstart') {

            this.isEnabled = true;      
            this.curX = e.offsetX;
            this.curY = e.offsetY; 
            this.ctx.beginPath();              
            this.ctx.moveTo(this.curX, this.curY);
        }
        
        if (e.type === 'mousemove' || e.type === 'touchmove') {

            if (this.isEnabled) {
                if(e.type === 'touchmove') {
                    e.preventDefault();
                    
                    if (e.touches.length === 1) {
                        const posCanvasClient = this.canvas.getBoundingClientRect();
                        const touch = e.touches[0];
                        this.curX = touch.clientX - posCanvasClient.left;
                        this.curY = touch.clientY - posCanvasClient.top;
                    }
                } else {
                    this.curX = e.offsetX;
                    this.curY = e.offsetY; 
                }            
            this.ctx.lineTo(this.curX, this.curY);
            this.ctx.stroke(); 
            }
        }
        if (e.type === 'touchend' || e.type === 'mouseup') {
        
            this.isEnabled = false;
            document.getElementById('input-booking').disabled = false;                          
            this.ctx.closePath();
        }

        if(e.type === 'mouseout') {
            this.isEnabled = false;
            this.ctx.closePath();
        }
    }
    
    clearCanvas = () => {
        const canvasW = this.canvas.width;
        const canvasH = this.canvas.clientHeight;

        this.ctx.clearRect(0, 0, canvasW, canvasH);
    }
}