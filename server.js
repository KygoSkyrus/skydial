const path = require("path");
const http = require("http");
const express = require("express");
const socket = require("socket.io");
const bodyParser = require('body-parser')


const app = express();
const server = http.createServer(app);
const io = socket(server);

//set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json())

const port = process.env.PORT || 4000;



// app.post('/api/doesUserExist', (req, res) => {})

const users = [];

//join useer to chat
function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

//get cuurent user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

//user leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

//to get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}




let mainUser = [];



io.on('connection', (socket) => {

  console.log('a user connected', socket.id);

  socket.emit("on:connection", socket.id)

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded")
  })

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("call:incoming", { signal: data.signalData, from: data.from, name: data.name })
  })

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", {signal:data.signal, name:data.name})
  })
  // SIMPLE PEER APPROACH

  socket.on('join-room', ({  dialId,name }) => {
    //to join a user to a room

    console.log('___user',  dialId)
    socket.join(dialId)

    socket.to(dialId).emit("user:joined", { id: socket.id, name })
    // io.to(dialId).emit("user:joined", { id: socket.id });
    // io.to(socket.id).emit("room:join", {userId,dialId});// can sent msg direct to a socket by using its socket it
  })




  socket.on('msg', ({ msg, to, from }) => {
    console.log('msg', msg, to)
    io.to(to).emit("msg", {
      msg,
      from,
    });
  })
  //new TRYYYYYYYY------------------STARTS_____________________________


  // socket.join(socket.userID);


  //----------
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);//send all existing users to the client:
  //--------------

  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  }, users);

  socket.on("private", ({ msgData, to }) => {
    console.log('pm', msgData, to)
    socket.to(to).emit("private", {
      msgData,
      from: socket.id,
    });
    //try for one to one connection
    // socket.to(to).to(socket.userID).emit("private", {
    //   msgData,
    //   from: socket.userID,
    //   to,
    // });
  });



  // socket.on("disconnect", async () => {
  //   const matchingSockets = await io.in(socket.userID).allSockets();
  //   const isDisconnected = matchingSockets.size === 0;
  //   if (isDisconnected) {
  //     // notify other users
  //     socket.broadcast.emit("user disconnected", socket.userID);
  //     // update the connection status of the session
  //     sessionStore.saveSession(socket.sessionID, {
  //       userID: socket.userID,
  //       username: socket.username,
  //       connected: false,
  //     });
  //   }
  // });


  //new TRYYYYYYYY------------------ENDS--__ __ _ __ __ _ _ __ _ __ _ __ _ ___ __ __ __

  //the user arguement is passed from the fronend
  socket.on('join_room', (user) => {
    //to join a user to a room

    console.log('user=====================', user)

    socket.join(user.room)

    const userData = { username: user.username, room: user.room, uid: socket.id };
    mainUser.push(userData);

    // socket.emit('msg',` welcome to ...`);//as soon as someone connects it will send this message(will send msg to a single client)

    //console.log('+++++++++',user)

    //socket.emit('roomUsers',username)
    // Convert map into 2D list:
    // ==> [['4ziBKG9XFS06NdtVAAAH', Set(1)], ['room1', Set(2)], ...]
    const arr = Array.from(socket.adapter.rooms);
    console.log('arr', arr)
    // Filter rooms whose name exist in set:
    // ==> [['room1', Set(2)], ['room2', Set(2)]]
    const filtered = arr.filter(room => !room[1].has(room[0]))
    // Return only the room name: 
    // ==> ['room1', 'room2']
    const res = filtered.map(i => i[0]);
    console.log(res);

    console.log('user with id ', socket.id, ' connected in room-', user.room);

    //for send the room and use details
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>', mainUser, mainUser.room)

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });

    function getRoomUsers(room) {
      return mainUser.filter(user => user.room === room);
    }

  })



  //when msg is sent
  socket.on('sendMessage', (data) => {
    //io.emit('message',{data})//to sent to all
    socket.to(data.room).emit('recieveMsg', data);//to send the data to only that specific room's users
    console.log(data)
  })

  socket.on('disconnect', ({ name, msg }) => {
    console.log('a user disconnected', socket.id);
  })




});


server.listen(port, () => console.log(`server is running at ${port}`));