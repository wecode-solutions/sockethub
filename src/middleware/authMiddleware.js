import { validateApiKey } from "../services/apiKeyService.js";

const authenticate = async (socket, next) => {
  const apiKey = socket.handshake.auth.apiKey;
  if (!apiKey) {
    return next(new Error("Authentication error"));
  }

  const project = await validateApiKey(apiKey);
  if (!project) {
    return next(new Error("Authentication error"));
  }

  socket.project = project;
  next();
};

export default authenticate;