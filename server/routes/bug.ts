import express from "express";
import {
  createBug,
  editBug,
  changeBugStatus,
  getBugs,
  getBugsByProjectId,
  deleteBug,
  addBugComment,
  fetchCommentsByBugId,
} from "../controllers/bug";

const router = express.Router();

router.get("/", getBugs);
router.get("/:projectId", getBugsByProjectId);
router.post("/:projectId", createBug);
router.delete("/:bugId", deleteBug);
router.post("/edit/:bugId", editBug);
router.post("/edit/status/:bugId", changeBugStatus);
router.post("/comments/:bugId", addBugComment);
router.get("/comments/:bugId", fetchCommentsByBugId);

export default router;
