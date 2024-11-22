import Project from "../db/models/project.js";
import crypto from "crypto";

const generateApiKey = async () => {
  return crypto.randomBytes(32).toString("hex");
};

const createProject = async (name) => {
  const apiKey = await generateApiKey();
  const project = new Project({ name, apiKey });
  await project.save();
  return project;
};

const validateApiKey = async (apiKey) => {
  return await Project.findOne({ apiKey });
};

export { generateApiKey, createProject, validateApiKey };
