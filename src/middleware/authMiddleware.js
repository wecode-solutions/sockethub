import { validateApiKey } from "../services/apiKeyService.js";

const authenticate = async (socket, next) => {
  try {
    const apiKey = socket.handshake?.auth?.apiKey;
    if (!apiKey) {
      console.error("No API key provided");
      return next(new Error("Authentication error: No API key provided"));
    }

    const project = await validateApiKey(apiKey);
    if (!project) {
      console.error("Invalid API key");
      return next(new Error("Authentication error: Invalid API key"));
    }

    socket.project = project; // Attach project to socket
    next(); // Allow connection
  } catch (error) {
    console.error("Error during authentication:", error.message);
    return next(new Error("Authentication error: Internal server error"));
  }
};

export default authenticate;
