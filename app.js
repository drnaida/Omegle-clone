const express = require('express');
const http = require("http");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});

let connectedPeers = [];

io.on('connection', (socket) => {
  connectedPeers.push(socket.id);
  console.log(connectedPeers);
  socket.on('disconnect', () => {
    console.log("user disconnected");

    const newConnectedPeers = connectedPeers.filter((peerSocketId) => {
      return peerSocketId !== socket.io;
    });

    connectedPeers = newConnectedPeers;
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
