import express from "express";
import { createBug } from "../controllers/bug";

const router = express.Router();

router.post("/:projectId/bugs", createBug);

export default router;
