const canvas = document.getElementById('main-canvas');
canvas.width = 1000;
canvas.height = 1000;
const ctx = canvas.getContext('2d');

let row = new Array(10).fill(0);
let board = new Array(10).fill(row);
let nextBoard = board;

let init = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 1, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

class cell{
    constructor(x, y, alive){
        this.x = x * 100;
        this.y = y * 100;
        this.alive = false;
    }

    draw(alive){
        this.alive = alive;
        ctx.beginPath();
        ctx.rect(this.x, this.y, 100, 100);
        this.alive ? ctx.fillStyle = "black" : ctx.fillStyle = "white";
        ctx.fill();
    }
}

let cells = board;

for(let y = 0; y < 10; y++){
    for(let x = 0; x < 10; x++){

        cells[y][x] = new cell(x, y).draw(init[y][x]);
    }
}