import express from "express";
import {
  getProjects,
  createProject,
  deleteProject,
} from "../controllers/project";

const router = express.Router();

router.get("/", getProjects);
router.post("/", createProject);
router.delete("/:projectId", deleteProject);

export default router;
