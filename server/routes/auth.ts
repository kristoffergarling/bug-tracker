import express from "express"; 
import { signUpUser } from "../controllers/auth"

const router = express.Router();

// Note to self: this is reached by going to localhost/signup/
router.get("/", signUpUser);

export default router;