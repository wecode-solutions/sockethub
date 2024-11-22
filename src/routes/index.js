import express from "express";
import bodyParser from "body-parser";
import { createProjectHandler, getProjectsHandler } from "../controllers/projectController.js";

const router = express.Router();
router.post("/projects", createProjectHandler);
router.get('/projects', getProjectsHandler);

export { router };
