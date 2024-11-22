import { createProject } from "../services/apiKeyService.js";
import Project from "../db/models/project.js";

const createProjectHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const project = await createProject(name);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProjectsHandler = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createProjectHandler, getProjectsHandler };
