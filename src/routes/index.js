import express from "express";
import bodyParser from "body-parser";
import { createProjectHandler, getProjectsHandler, updateProjectHandler, deleteProjectHandler } from "../controllers/projectController.js";
import { router as authRoutes } from "../auth/routes.js";
import { authenticate } from "../middleware/authMiddlewareExpress.js";

const router = express.Router();
router.post("/projects", authenticate, createProjectHandler);
router.get('/projects', authenticate, getProjectsHandler);
router.put('/projects/:projectId', authenticate, updateProjectHandler)
router.delete('/projects/:projectId', authenticate, deleteProjectHandler)

router.use('/auth', authRoutes)

export { router };
