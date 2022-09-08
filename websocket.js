var WebSocketServer = require("ws").Server;

var wss = new WebSocketServer({ port: 8080 });
console.log("here");
var sockets = [];

function removeSocket(socket) {
  sockets.splice(sockets.indexOf(socket), 1);
}

wss.on("connection", function (ws) {
  console.log("WebSocket Client Connected!");
  ws.on("error", function (error) {
    console.log(`Connection Error: ${error}`);
    removeSocket(ws);
  });
  ws.on("close", function () {
    console.log("Connection Closed!");
    removeSocket(ws);
  });
  sockets.push(ws);
  //   console.log(ws);
  //   console.log(sockets);
});

setInterval(function () {
  var numSockets = sockets.length;
  var randomNum = Math.floor(Math.random() * 11); // integer between 0 and 10 inclusive
  for (var i = 0; i < numSockets; i++) {
    sockets[i].send(randomNum.toString());
  }
}, 1000);
