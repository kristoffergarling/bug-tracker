import express from "express";
import {
  getProjects,
  createProject,
  deleteProject,
  editProject,
  addProjectContributor,
  deleteProjectContributor,
} from "../controllers/project";

const router = express.Router();

router.get("/", getProjects);
router.post("/", createProject);
router.post("/:projectId", editProject);
router.delete("/:projectId", deleteProject);
router.post("/:projectId/contributors", addProjectContributor);
router.delete(
  "/:projectId/contributors/:contributor",
  deleteProjectContributor
);

export default router;
