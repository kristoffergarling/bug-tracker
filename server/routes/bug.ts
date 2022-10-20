import express from "express";
import { createBug, editBug, getBugsByProjectId } from "../controllers/bug";

const router = express.Router();

router.get("/:projectId", getBugsByProjectId);
router.post("/:projectId", createBug);
router.post("/edit/:bugId", editBug);

export default router;
