import io from 'socket.io-client';

const socket = new io.connect(window.location.href.replace(/^http/, "ws"));
socket.on('connect_error', e => console.log("error"));
socket.on('connect', e => console.log("socket.io connection open"));

socket.emit('join', "Mark");

canvas = document.createElement('canvas');
canvas.id = "canvas";
document.body.appendChild(canvas);
canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
canvas.style.width = '100%';
canvas.width = 800;
canvas.style.height = '100%';
canvas.height = 800;


let colors = ["Chartreuse", "Cyan", "Tomato", "Yellow", "Magenta", "Orange", "Black", "White"];

let direction = 0;

let newGrid = new Array(100);

for (let i = 0; i < newGrid.length; i++) {
  newGrid[i] = new Array(100);
}

for (let i = 0; i < newGrid.length; i++) {
  for (let j = 0; j < newGrid.length; j++) {
    newGrid[i][j] = Math.round(Math.random() * 9);
  }
}


function drawCanvas() {
  let tileSize = canvas.width / 100;
  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid.length; j++) {
      canvas.getContext("2d").fillStyle = colors[newGrid[i][j]];
      canvas.getContext("2d").fillRect(i * tileSize, j * tileSize, i * tileSize + (tileSize), j * tileSize + (tileSize));
    }
  }

  window.requestAnimationFrame(drawCanvas);
}

window.addEventListener('keydown', function(e) {
  if (e.keyCode == 38) { //up
  	socket.emit('direction', 3);    
  } else if (e.keyCode == 39) { //right
	socket.emit('direction', 1);
  } else if (e.keyCode == 40) { //down
  	socket.emit('direction', 4);    
  } else if (e.keyCode == 37){ //left
  	socket.emit('direction', 2);
  }
});
