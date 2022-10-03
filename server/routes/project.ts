import express from "express";
import { getProjects } from "../controllers/project";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/", auth, getProjects);

export default router;
