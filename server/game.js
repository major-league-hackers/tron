let top_wall = 0;
let bot_wall = 100;
let right_wall = 100;
let left_wall = 0;

let grid;

let players = new Array(8);

let running = false;

class TronPlayer {
  constructor() {
    this.id = id;
    this.isAlive = true;
    this.currentDirection = Math.round(Math.random() * 4) + 1;  // results in random between 1 and 4
    this.x_pos = (Math.random * 80) + 10;
    this.y_pos = (Math.random * 80) + 10;
  }
}


function newGame() {
  grid = makeNewGrid();

  running = false;

  for (let i = 0; i < players.length; i++) {
    players[i].x_pos = (Math.random * 80) + 10;
  players[i].y_pos = (Math.random * 80) + 10;
  }
}

// initialize a game grid 100x100 square
function makeNewGrid() {
  let newGrid = new Array(100);

  for (let i = 0; i < grid.length; i++) {
      newGrid[i] = new Array(100);
  }

  return newGrid;
}


function tick(){
    let timer = -1;
    for (let i = 0; i < players.length; i++) {
        if (running) {
          move(players[i]);
        } else {
          if (players.length >=2 ) {
            if  (timer == -1) {
                timer = 10;
            } else if (timer == 0) {
        running = true;
            } else {
                timer -= 1;
            }
          } else {
            timer = -1;
          }
        }

        sendData();
  }

    if (endGame()) {
      newGame();
    }
}

function sendData() {

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
  if ( id !=  0) {
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

// return true if there is only one player left alive
function endGame(players) {
  let count = 0;
  for(let i = 0; i < players; i++) {
    if(players[i].isAlive == true) {
      count++;
    }
  }
  if(count == 1) {
    return true;
  }
  return false;
}

exports.tick = tick
