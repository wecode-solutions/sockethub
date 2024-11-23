import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import authenticate from './middleware/authMiddleware.js';

const app = express();
const server = http.createServer(app);

// Set up Socket.IO with CORS handling
export const io = new SocketIOServer(server, {
    cors: {
        origin: 'http://127.0.0.1:5500', // Change this to your client's URL if it's different
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'], // If needed for custom headers
        credentials: true,
    }
});

io.use(authenticate);

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle incoming messages
    socket.on('message', (msg) => {
        console.log('Message received:', msg);
        io.emit('message', msg);  // Broadcast message to all clients
    });

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`WebSocket server running on http://localhost:${PORT}`);
});
