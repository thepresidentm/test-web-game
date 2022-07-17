const canvas = document.getElementById('main-canvas');
canvas.width = 1000;
canvas.height = 1000;
const ctx = canvas.getContext('2d');
ctx.fillStyle = "black";

class square{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.draw();
    }

    draw(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, 100, 100);
        ctx.fill();
    }

    moveX(i){
        // i should be 1 or -1
        ctx.clearRect(this.x, this.y, 100, 100);
        this.x += 100 * i;
        this.draw();
    }

    moveY(i){
        // i should be 1 or -1
        ctx.clearRect(this.x, this.y, 100, 100);
        this.y -= 100 * i;
        this.draw();
    }
}

document.addEventListener("keypress", (event)=>{
    let letra = event.key.toLowerCase();
    letra == 'd' ? cuadrado.moveX(1) :
    letra == 'a' ? cuadrado.moveX(-1) :
    letra == 'w' ? cuadrado.moveY(1) :
    letra == 's' ? cuadrado.moveY(-1) :
    console.log("Tecla no valida");
})

let cuadrado = new square(0,0);


