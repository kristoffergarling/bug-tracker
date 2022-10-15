import express from "express";
import { createBug, getBugsByProjectId } from "../controllers/bug";

const router = express.Router();

router.get("/:projectId", getBugsByProjectId);
router.post("/:projectId", createBug);

export default router;
