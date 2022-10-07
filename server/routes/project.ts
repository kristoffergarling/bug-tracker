import express from "express";
import {
  getProjects,
  createProject,
  deleteProject,
  getProjectBugs,
} from "../controllers/project";

const router = express.Router();

router.get("/", getProjects);
router.post("/", createProject);
// router.get("/:projectId", getProjectBugs);
router.delete("/:projectId", deleteProject);

export default router;
