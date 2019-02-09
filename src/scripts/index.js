import io from 'socket.io-client';

const socket = new io.connect(window.location.href.replace(/^http/, "ws"));
socket.on('connect_error', e => console.log("error"));
socket.on('connect', e => console.log("socket.io connection open"));

socket.emit('join', "Mark");

let canvas = document.createElement('canvas');
canvas.id = "canvas";
document.body.appendChild(canvas);
canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;


let colors = ["Black", "Cyan", "Tomato", "Yellow", "Magenta", "Orange", "Black", "White"];

let direction = 0;

let newGrid = new Array(100);

for (let i = 0; i < newGrid.length; i++) {
  newGrid[i] = new Array(100);
}

for (let i = 0; i < newGrid.length; i++) {
  for (let j = 0; j < newGrid.length; j++) {
    newGrid[i][j] = 0
  }
}

socket.on("update", data => {
  newGrid = data
});

function draw() {
  let tileSize = canvas.width / 100;
  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid.length; j++) {
      canvas.getContext("2d").fillStyle = colors[newGrid[i][j]];
      // if (newGrid[i][j] !== 0) {
      	canvas.getContext("2d").fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
      // }
    }
  }

  window.requestAnimationFrame(draw);
}
draw();

window.addEventListener('keydown', function(e) {
  if (e.keyCode == 38) { 			//up
  	socket.emit('direction', 3);
  } else if (e.keyCode == 39) { 	//right
	socket.emit('direction', 1);
  } else if (e.keyCode == 40) { 	//down
  	socket.emit('direction', 4);
  } else if (e.keyCode == 37){ 		//left
  	socket.emit('direction', 2);
  }
});
