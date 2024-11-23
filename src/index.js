import { configDotenv } from "dotenv";
import express from "express";
import connectDB from "./db/connection.js";
import setupWebsocket from "./websocket/index.js";
import http from "http";
import { router } from "./routes/index.js";
import path from "path";
import cors from "cors";

configDotenv();
const app = express();
app.use(express.json());
app.use(cors());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "frontend")));
app.use("/api", router);

const server = http.createServer(app);
setupWebsocket(server);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
