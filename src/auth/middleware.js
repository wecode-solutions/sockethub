import { validateApiKey } from "../services/apiKeyService";

const authenticate = async (socket, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = verifyToken(token);
    req.user = user; // Attach user info to the request
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authenticate;