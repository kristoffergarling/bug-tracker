import express from "express";
import {
  createBug,
  editBug,
  getBugsByProjectId,
  deleteBug,
} from "../controllers/bug";

const router = express.Router();

router.get("/:projectId", getBugsByProjectId);
router.post("/:projectId", createBug);
router.delete("/:bugId", deleteBug);
router.post("/edit/:bugId", editBug);

export default router;
