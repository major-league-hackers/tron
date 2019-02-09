const shortid = require('shortid');

class TronPlayer {
  constructor(socketId, name) {
    this.socketId = socketId;
    this.id;
    this.name = name;
    this.isAlive = true;
    this.direction = Math.round(Math.random() * 4) + 1;  // results in random between 1 and 4
    this.x_pos = Math.round(Math.random() * 80) + 10;
    this.y_pos = Math.round(Math.random() * 80) + 10;
  }

  setId(id) {
    this.id = id;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  move(grid) {
    //right = 1
    //left = 2
    //up = 3
    //down = 4
    // If it's not alive don't move
    if (!this.isAlive) {
      return;
    }

    const direction = this.direction;
    //right
    if (direction == 1) {
      //move the head
      this.x_pos += 1;

      //left
    } else if (direction == 2) {
      //move the head
      this.x_pos -= 1;

      //up
    } else if (direction == 3) {
      //move the head
      this.y_pos -= 1;

      //down
    } else if (direction == 4) {
      //move the head
      this.y_pos += 1;
    }

    if (this.x_pos < 0 || this.y_pos < 0 || this.x_pos > 100 || this.y_pos > 100) {
      this.kill();
      return;
    }

    const id = grid[this.x_pos][this.y_pos];
    if (id !==  0) {
      this.kill();
      return;
    }

    grid[this.x_pos][this.y_pos] = this.id;
  }

  kill() {
    this.isAlive = false;
  }
}

const MAX_PLAYERS = 4;
class TronGame {
  constructor(io) {
    this.io = io;
    this.id = shortid.generate();
    this.running = false;
    this.players = {};
    this.grid = this.makeGrid();
  }

  addPlayer(socketId, name) {
    this.players[socketId] = new TronPlayer(socketId, name);
    this.players[socketId].setId(this.getPlayerArray().length);
    // console.log(this.getPlayerArray());
    // console.log(this.getPlayerArray().length);
    if (this.getPlayerArray().length === MAX_PLAYERS) {
      this.startGame();
    }
  }

  removePlayer(socketId) {
    delete this.players[socketId];
  }

  gameIsFull() {
    return this.getPlayerArray().length === MAX_PLAYERS;
  }

  // initialize a game grid 100x100 square
  makeGrid() {
    let newGrid = new Array(100);

    for (let i = 0; i < newGrid.length; i++) {
        newGrid[i] = new Array(100);
    }

    for (let i = 0; i < newGrid.length; i++){
      for (let j = 0; j < newGrid.length; j++){
        newGrid[i][j] = 0;
      }
    }
    return newGrid;
  }

  tick() {
    if (this.running) {
      for (let player of this.getPlayerArray()) {
        player.move(this.grid);
      }
      this.sendData();
    }
  }

  getPlayerArray() {
    return Object.values(this.players);
  }

  startGame() {
    console.log("Starting game");
    this.running = true;
  }

  setPlayerDirection(socketId, direction) {
    console.log(`${socketId}: ${direction}`);
    const player = this.players[socketId];
    if (direction === 1 && player.direction !== 2
      || direction === 2 && player.direction !== 1
      || direction === 3 && player.direction !== 4
      || direction === 4 && player.direction  !== 3) {
      player.setDirection(direction);
    }
  }

  sendData() {
    this.io.sockets.emit('update', this.grid);
  }

  endGame() {
    let count = 0;
    for(let player of this.getPlayerArray()) {
      if(player.isAlive == true) {
        count++;
      }
    }
    if(count == 0) {
      return true;
    }
    return false;
  }
}

exports.TronGame = TronGame;
exports.TronPlayer = TronPlayer;

// function newGame() {
//   grid = makeNewGrid();
//
//   running = false;
//
//   for (let i = 0; i < players.length; i++) {
//     players[i].x_pos = (Math.random * 80) + 10;
//     players[i].y_pos = (Math.random * 80) + 10;
//   }
// }
//
//
// function tick(){
//     let timer = -1;
//     for (let i = 0; i < players.length; i++) {
//         if (running) {
//           move(players[i]);
//         } else {
//           if (players.length >=2 ) {
//             if  (timer == -1) {
//                 timer = 10;
//             } else if (timer == 0) {
//         running = true;
//             } else {
//                 timer -= 1;
//             }
//           } else {
//             timer = -1;
//           }
//         }
//
//         sendData();
//   }
//
//     if (endGame()) {
//       newGame();
//     }
// }
//
// function sendData() {
//     //print some stuff
//     for (let i = 0; i < players.length; i++){
//       console.log(i);
//         console.log("player " + i + " has location x: " + players[i].x_pos + ", y: " + players[i].y_pos + "\n");
//         console.log("player " + i + " is alive (T or F): " + players[i].isAlive + "\n");
//     }
//     console.log(grid);
// }
//
//
// function getHead(player){
//     return [player.x_pos, player.y_pos];
// };
//
// // return true if there is only one player left alive
