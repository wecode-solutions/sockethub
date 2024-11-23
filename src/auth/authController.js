import User from "../db/models/user.js";
import { generateToken, verifyToken } from "./authService.js";

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    const token = generateToken(user);
    res.status(201).json({ message: "User created", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { register, login };