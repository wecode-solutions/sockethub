import express from "express";
import bodyParser from "body-parser";
import {
  createProjectHandler,
  getProjectsHandler,
  updateProjectHandler,
  deleteProjectHandler,
} from "../controllers/projectController.js";
import { router as authRoutes } from "../auth/routes.js";
import { authenticate } from "../middleware/authMiddlewareExpress.js";

const router = express.Router();

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the project
 *                 example: My Project
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Validation error
 */
router.post("/projects", authenticate, createProjectHandler);
/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects for the authenticated user
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   apiKey:
 *                     type: string
 *       401:
 *         description: Unauthorized
 */
router.get("/projects", authenticate, getProjectsHandler);
router.put("/projects/:projectId", authenticate, updateProjectHandler);
router.delete("/projects/:projectId", authenticate, deleteProjectHandler);

router.use("/auth", authRoutes);

export { router };
