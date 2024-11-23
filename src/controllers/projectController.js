import { createProject } from "../services/apiKeyService.js";
import Project from "../db/models/project.js";

const createProjectHandler = async (req, res) => {
  try {
    const { name } = req.body;

    const userId = req.user.id;

    const project = await createProject(name, userId);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProjectsHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const projects = await Project.find({ user: userId });

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProjectHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const { projectId } = req.params;

    const project = await Project
      .findOneAndUpdate({ _id: projectId },
        { name },
        { new: true });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(project);
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteProjectHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOneAndDelete({ _id: projectId });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(project);
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export { createProjectHandler, getProjectsHandler, updateProjectHandler, deleteProjectHandler };
