import io from 'socket.io-client';

const socket = new io.connect(window.location.href.replace(/^http/, "ws"));
socket.on('connect_error', e => console.log("error"));
socket.on('connect', e => console.log("socket.io connection open"));

let canvas = document.createElement('canvas');
canvas.id = "canvas";
document.body.appendChild(canvas);
const context = canvas.getContext("2d");
const canvasSize = window.innerHeight * 0.9;
canvas.width = canvasSize;
canvas.height = canvasSize;

let colors = ["Black", "Red", "Blue", "Yellow", "Green", "Orange", "Pink", "White"];

// Display text
let displayText = document.createElement('h1');
displayText.id = "text";
document.body.appendChild(displayText);

const joinGame = () => {
  socket.emit('join', "Mark");
  context.fillStyle = "Black";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

const showWinText = (text) => {
  displayText.innerText = text;
  displayText.style.display = "block";
}

const hideWinText = () => {
  displayText.style.display = "none";
}

socket.on("gameover", winner => {
  showWinText(`${colors[winner]} won!`);
  setTimeout(() => {
    joinGame();
    hideWinText();
  }, 3000);
});


joinGame();



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
  draw();
});

function draw() {
  let tileSize = canvas.width / 100;
  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid.length; j++) {
      if (newGrid[i][j] !== 0) {
        context.fillStyle = colors[newGrid[i][j]];
      	context.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
      }
    }
  }

  // window.requestAnimationFrame(draw);
}

// draw();

window.addEventListener('keydown', function(e) {
  if (e.keyCode == 38) { 			    //up
  	socket.emit('direction', 3);
  } else if (e.keyCode == 39) { 	//right
	socket.emit('direction', 1);
  } else if (e.keyCode == 40) { 	//down
  	socket.emit('direction', 4);
  } else if (e.keyCode == 37){ 		//left
  	socket.emit('direction', 2);
  }
});
