import jwt from "jsonwebtoken";

const SECRET_KEY = "my_secret_key";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

export { generateToken, verifyToken };