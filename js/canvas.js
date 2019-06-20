class Signature {
    constructor() {
        this.canvas = document.getElementById("sig-canvas");
        this.ctx = this.canvas.getContext('2d');
        this.drawState = false;
        this.preX = 0;
        this.preY = 0;
        this.curX = 0;
        this.curY = 0;
    }

    initCanvas() {

        this.canvas.addEventListener("mousemove", this.canvasEvent, false);
        this.canvas.addEventListener("mousedown", this.canvasEvent, false);
        this.canvas.addEventListener("mouseup", this.canvasEvent, false);
        this.canvas.addEventListener("mouseout", this.canvasEvent, false);
        this.canvas.addEventListener("touchmove", this.canvasEvent, false);
        this.canvas.addEventListener("touchstart", this.canvasEvent, false);
        this.canvas.addEventListener("touchend", this.canvasEvent, false);
    }

    canvasEvent(e) {
        
        const canvasObj = document.getElementById("sig-canvas");
        const ctx = canvasObj.getContext("2d");
        ctx.strokeStyle = "#343434";
        ctx.lineWidth = 3;
        
        if (e.type === 'mousedown' || e.type === 'touchstart') {

            this.drawState = true;      
            this.curX = e.offsetX;
            this.curY = e.offsetY; 
            ctx.beginPath();              
            ctx.moveTo(this.curX, this.curY);
        }
        
        if (e.type === 'mousemove' || e.type === 'touchmove') {

            if (this.drawState) {
                if(e.type === 'touchmove') {
                    e.preventDefault();
                    
                    if (e.touches.length === 1) {
                        var posCanvasClient = canvasObj.getBoundingClientRect();
                        var touch = e.touches[0];
                        this.curX = touch.clientX - posCanvasClient.left;
                        this.curY = touch.clientY - posCanvasClient.top;
                    }
                } else {
                    this.curX = e.offsetX;
                    this.curY = e.offsetY; 
                }            
            ctx.lineTo(this.curX, this.curY);
            ctx.stroke(); 
            }
        }
        if (e.type === 'touchend' || e.type === 'mouseup') {
        
            this.drawState = false;
            document.getElementById('input-booking').disabled = false;      ctx.closePath();
        }

        if(e.type === 'mouseout') {
            this.drawState = false;
            ctx.closePath();
        }
    }
    
    clearCanvas() {
        const canvasW = this.canvas.width;
        const canvasH = this.canvas.clientHeight;

        this.ctx.clearRect(0, 0, canvasW, canvasH);
    }
}