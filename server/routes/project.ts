import express from "express";
import {
  getProjects,
  createProject,
  deleteProject,
  getProjectBugs,
  addProjectContributor,
  deleteProjectContributor,
} from "../controllers/project";

const router = express.Router();

router.get("/", getProjects);
router.post("/", createProject);
// router.get("/:projectId", getProjectBugs);
router.delete("/:projectId", deleteProject);

router.post("/:projectId/contributors", addProjectContributor);
router.delete(
  "/:projectId/contributors/:contributor",
  deleteProjectContributor
);

export default router;
