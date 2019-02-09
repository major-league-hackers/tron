

let top_wall = 0;
let bot_wall = 100;
let right_wall = 100;
let left_wall = 0;

let grid;

let players = new Array(8);

let colors = ["Chartreuse", "Cyan", "Tomato", "Yellow", "Magenta", "Orange", "Black", "White"];

function TronPlayer(id) {
  this.id = id;
  this.isAlive = true;
  this.currentDirection = Math.round(Math.random() * 4) + 1;		// results in random between 1 and 4
  this.x_pos = (Math.random * 80) + 10;
  this.y_pos = (Math.random * 80) + 10;
}

let tronplayer = {
  id: -1,
  isAlive: true,
  currentDirection: 0,
  x_pos: 50,
  y_pos: 50,
  color: "blue"
};

for (let i = 0; i < players.length; i++) {
  //move(players[i], )
}

function newGame() {
  grid = makeNewGrid();

  // set player positions
}

function makeNewGrid() {
  let newGrid = new Array(100);

	for (let i = 0; i < grid.length; i++) {
  		newGrid[i] = new Array(100);
	}

  return newGrid;
}

function tick() {
  // console.log('game')
}

function setDirection(player, direction) {
  player.currentDirection = direction;

  //handle key presses to change direction
  // window.addEventListener('keydown', function(e)) {
  //   if (e.keyCode == 38) { //up
  //   	player.currentDirection = 3;
  //   } else if (e.keyCode == 39) { //right
  //     player.currentDirection = 1;
  //   } else if (e.keyCode == 40) { //down
  //     player.currentDirection = 4;
  //   } else if (e.keyCode == 37){ //left
  //     player.currentDirection = 2
  //   }
  // }
}

//right = 1
//left = 2
//up = 3
//down = 4
function move(player) {
  let direction = player.currentDirection;

  //right
  if (direction == 1) {
    //move the head
    player.x_pos += 1;
    player.currentDirection = 1;

    //left
  } else if (direction == 2) {
    //move the head
    player.x_pos -= 1;
    player.currentDirection = 2;

    //up
  } else if (direction == 3){
    //move the head
    player.y_pos -= 1;
    player.currentDirection = 3;

    //down
  } else if (direction == 4){

    //move the head
    player.y_pos += 1;
    player.currentDirection = 4;
  }

  grid[player.x_pos][player.y_pos] = player.id;

  let id = grid[player.x_pos][player.y_pos]
  if ( id !=  0 && id != player.id) {
    killPlayer(player);
  }

  if (player.x_pos < 0 || player.y_pos < 0 || player.x_pos  > canvas.width || player.y_pos > canvas.height) {
    killPlayer(player);
  }

};

function killPlayer(player) {
  player.isAlive = false;
}

function getHead(player){
  	return [player.x_pos, player.y_pos];
};

exports.tick = tick
