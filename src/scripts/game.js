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


function setDirection(player, direction) {
  player.currentDirection = direction;
  
  //right = 1
  //left = 2
  //up = 3 
  //down = 4
  //handle key presses to change direction
  window.addEventListener('keydown', function(e) {
    if (e.keyCode == 38) { //up
      if (player.currentDirection != 3 && player.currentDirection != 4){
          player.currentDirection = 3;
        }
      
    } else if (e.keyCode == 39) { //right
        if (player.currentDirection != 1 && player.currentDirection != 2){
          player.currentDirection = 1;
        }
    } else if (e.keyCode == 40) { //down
        if (player.currentDirection != 3 && player.currentDirection != 4){
      player.currentDirection = 4;          
        }
      
    } else if (e.keyCode == 37){ //left
        if (player.currentDirection != 1 && player.currentDirection != 2) {
                player.currentDirection = 2
        }
    }
  });
}