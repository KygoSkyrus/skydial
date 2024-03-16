const http = require("http");
const express = require("express");
const socket = require("socket.io");
const bodyParser = require('body-parser')
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(bodyParser.json())


//set static folder
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


io.on('connection', (socket) => {

  socket.emit("on:connection", socket.id)

  socket.on("callUser", (data) => {
    // console.log('is socket active', io.sockets?.sockets?.has(data.userToCall))// checks if the user is even present
    io.to(data.userToCall).emit("call:incoming", { signal: data.signalData, from: data.from, name: data.name })
  })

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", { signal: data.signal, name: data.name })
  })

  socket.on("call:declined", (data) => {
    io.to(data.to).emit("call:declined", { from: data.from, name: data.name })
  })

  socket.on("call:end", (data) => {
    io.to(data.to).emit("call:end", { from: data.from, name: data.name })
  })

  socket.on('msg:sent', ({ msg, to, from }) => {
    io.to(to).emit("msg:recieved", { msg, from });
  })

  // not in use
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded")
  })

});

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`server is running at ${port}`));