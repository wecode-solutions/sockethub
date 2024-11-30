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
    const projectName = socket.project.name;
    socket.join(projectName);

    console.log(
      `Client connected to project: ${projectName}, socket ID: ${socket.id}`
    );

    socket.on("message", (msg) => {
      console.log(`Message from project ${projectName}: ${msg}`);
      io.to(projectName).emit("message", msg);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export default setupWebsocket;
