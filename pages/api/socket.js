import { Server } from 'socket.io';

const socket= (req, res) => {
  const io = new Server(req.httpServer, {
    cors: {
      origin: true, // Allow any origin (adjust for production)
    },
  });

  io.on('connection', (socket) => {
    // Handle socket events for joining rooms, exchanging signaling information etc.
    socket.on('join-room', (roomId) => {
      // ...
    });
    // ... other event handlers
  });

  res.status(200).json({ message: 'Socket.io server is running' });
};

export default socket;
