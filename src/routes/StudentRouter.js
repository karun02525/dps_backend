import express from "express";
const router = express.Router();
import { auth } from "../utils/verifyToken.js";

import { getUsers, getuser } from "../controllers/student/StudentController.js";

router.get("/", auth, getUsers);

router.get("/:id", auth, getuser);

export default router;
