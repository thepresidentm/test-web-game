const canvas = document.getElementById('main-canvas');
canvas.width = 1000;
canvas.height = 1000;
const ctx = canvas.getContext('2d');

let board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

let init = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

let nextStatus = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

class cell{

    constructor(x, y, alive){
        this.x = x * 100;
        this.y = y * 100;
        this.alive = alive;
        this.draw();
    }

    draw(){
        // this.alive = alive;
        ctx.beginPath();
        ctx.rect(this.x, this.y, 100, 100);
        this.alive ? ctx.fillStyle = "black" : ctx.fillStyle = "white";
        ctx.fill();
    }

}

let cellsMatrix = board;
initEstado(init);
let nextBoard = cellsMatrix;

function initEstado(array){
    for(let y = 0; y < 10; y++){
        for(let x = 0; x < 10; x++){
            cellsMatrix[y][x] = new cell(x, y, array[y][x]);
        }
    }
}

function nextAlive(cell){
    x = cell.x / 100;
    y = cell.y / 100;
    let neighbours = 0;
    if( x > 0 ){
        neighbours += cellsMatrix[y][x - 1].alive ? 1 : 0; 
    }
    if( y > 0 ){
        neighbours += cellsMatrix[y - 1][x].alive ? 1 : 0;
    }
    if( x < 9 ){
        neighbours += cellsMatrix[y][x + 1].alive ? 1 : 0;
    }
    if( y < 9){
        neighbours += cellsMatrix[y + 1][x].alive ? 1 : 0;
    }
    if(x > 0 && y > 0){
        neighbours += cellsMatrix[y - 1][x - 1].alive ? 1 : 0;
    }
    if(x < 9 && y < 9){
        neighbours += cellsMatrix[y + 1][x + 1].alive ? 1 : 0;
    }
    if(x < 9 && y > 0){
        neighbours += cellsMatrix[y - 1][x + 1].alive ? 1 : 0;
    }
    if(y < 9 && x > 0){
        neighbours += cellsMatrix[y + 1][x - 1].alive ? 1 : 0;
    }
    // console.log(`La celula ${x}, ${y} tiene ${neighbours} vecinos vivos`);
    return cell.alive ? ifAlive(neighbours) : ifDeath(neighbours);
}

function ifAlive(neighbours){
    return  neighbours == 2 || neighbours == 3;
}

function ifDeath(neighbours){
    return neighbours == 3;
}

document.addEventListener("keypress", (event)=>{
    let letra = event.key.toLowerCase();
    if(letra == 'x'){
        console.log('avance');
        // Si ambas operaciones se ejecutan en el mismo for, el contedo de vecinos
        // se hara mientras se estan cambiando los status
        for(let y = 0; y < 10; y++){
            for(let x = 0; x < 10; x++){
                nextStatus[y][x] = nextAlive(cellsMatrix[y][x]);
            }
        }
        for(let y = 0; y < 10; y++){
            for(let x = 0; x < 10; x++){
                cellsMatrix[y][x].alive = nextStatus[y][x];
                cellsMatrix[y][x].draw();
            }
        }
    }
    
})
