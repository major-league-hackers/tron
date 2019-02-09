const fs = require('fs');
const path = require('path');
const express  = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

const game = require('./server/game.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, 'public')));

// Socket server
io.on('connection', socket => {
	// Something
});

// game loop
// https://github.com/timetocode/node-game-loop
const hrtimeMs = function() {
    let time = process.hrtime();
    return time[0] * 1000 + time[1] / 1000000;
}

const TICK_RATE = 20;
let tick = 0;
let previous = hrtimeMs();
let tickLengthMs = 1000 / TICK_RATE;

const loop = () => {
    setTimeout(loop, tickLengthMs)
    let now = hrtimeMs();
    let delta = (now - previous) / 1000;
    game.tick();
    // game.update(delta, tick) // game logic would go here
    previous = now
    tick++
}

loop(); // starts the loop

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
