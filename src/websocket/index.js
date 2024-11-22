import { Server } from "socket.io";
import authenticate from "../middleware/authMiddleware.js";

const setupWebsocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.use(authenticate);

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("message", (msg) => {
      console.log(`Message from ${socket.project.name}: ${msg}`);
      io.emit("message", msg);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export default setupWebsocket;
