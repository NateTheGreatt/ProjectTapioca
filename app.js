var express = require('express');
var http = require('http');
var io = require('socket.io');
var app = express();
var server = http.createServer(app);
var socketServer = io.listen(server);
app.use(express.static(__dirname + '/client'));
app.get('/', function (req, res) {
    res.sendfile('client/index.html');
});

var PORT = process.env.PORT;
var IP = process.env.IP;
server.listen(PORT, IP);
console.log('Server started at ' + IP + ':' + PORT);

var gameloop = require('node-gameloop');

var fps = 30;
var frameCount = 0;
var id = gameloop.setGameLoop(function(delta) {
  // game.update()
}, 1000/fps);


// 30 fps
// var tickLengthMs = 1000 / 30;
// var previousTick = Date.now();
// var actualTicks = 0;
// var gameLoop = function () {
//     var now = Date.now();
//     actualTicks++;
//     if (previousTick + tickLengthMs <= now) {
//         var delta = (now - previousTick) / 1000;
//         previousTick = now;
//         actualTicks = 0;
//     }
//     if (Date.now() - previousTick < tickLengthMs - 16) {
//         setTimeout(gameLoop);
//     }
//     else {
//         setImmediate(gameLoop);
//     }
// };
