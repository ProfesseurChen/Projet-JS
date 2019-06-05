/*var canvasElt;

function getCanvas() {
    var buttonEltCanvas = document.getElementById('all-ok');
    var buttonSubmit = document.querySelector('#signature-ok.button.is-link');
    buttonEltCanvas.addEventListener("click", function(k) {
        canvasElt = document.getElementById("bloc-signature");
        canvasElt.style.display = 'block';
        
        /*var inputEltValue = document.querySelector('.input');
        inputEltValue.addEventListener('input', function(elt) {
            var valueElt = elt.values;
            if (!valueElt) {
                buttonSubmit.disabled = false;
            }
        }) 
    })
}

*/
function getCanvas() {
    var canvas= document.getElementById('canvas');

    var ctx = canvas.getContext('2d');

    canvas.addEventListener('mousedown', function(e) {
        this.down = true;   
        this.X = e.pageX ;
        this.Y = e.pageY ;
    }, 0);

    canvas.addEventListener('mouseup', function() {
        this.down = false;          
    }, 0);

    canvas.addEventListener('mousemove', function(e) {
        if(this.down) {
            with(ctx) {
            ctx.beginPath();
            moveTo(this.X, this.Y);
            lineTo(e.pageX , e.pageY );
            ctx.lineWidth=1;
            stroke();
            }
            this.X = e.pageX ;
            this.Y = e.pageY ;
            
        }
    }, 0);
}
