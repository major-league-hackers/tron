import io from 'socket.io-client';

const socket = new io.connect(window.location.href.replace(/^http/, "ws"));
socket.on('connect_error', e => console.log("error"));
socket.on('connect', e => console.log("socket.io connection open"));


let colors = ["Black", "Red", "Blue", "Yellow", "Green", "Orange", "Pink", "White", "Lime"];

let canvas = document.createElement('canvas');
canvas.id = "canvas";
document.body.appendChild(canvas);
const context = canvas.getContext("2d");
const canvasSize = window.innerHeight * 0.9;
canvas.width = canvasSize;
canvas.height = canvasSize;

// let displayPlayer = document.createElement('h1');
// displayPlayer.id = "player";

socket.on('init', id => {
  // displayPlayer.innerText = "You are " + colors[id];
  // document.body.appendChild(displayPlayer);
  canvas.style.border = "5px solid " + colors[id];
});


// Display text
let displayText = document.createElement('h1');
displayText.id = "text";
document.body.appendChild(displayText);

const joinGame = () => {
  socket.emit('join', "Mark");
  context.fillStyle = "Black";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

const showMainText = (text) => {
  displayText.innerText = text;
  displayText.style.display = "block";
}

const hideMainText = () => {
  displayText.style.display = "none";
}

socket.on('countdown', count => {
  if (count > 0) {
    showMainText(`Starting in ${count}`);
  } else {
    hideMainText();
  }

});

socket.on("gameover", winner => {
  if (typeof winner === 'string') {
    showMainText(`Tie!`);
  } else {
    showMainText(`${colors[winner]} won!`);
  }
  let counter = 3;
  const countdown = () => setTimeout(() => {
    showMainText(`Rejoining in ${counter}`)
    if (counter === 0) {
      joinGame();
      hideMainText();
    } else {
      counter -= 1;
      countdown();
    }
  }, 1000);
  countdown();
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

// https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            socket.emit('direction', 2);
        } else {
            socket.emit('direction', 1);
        }
    } else {
        if ( yDiff > 0 ) {
            socket.emit('direction', 3);
        } else {
            socket.emit('direction', 4);
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};
