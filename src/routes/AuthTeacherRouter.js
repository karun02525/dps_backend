import express from "express";
const router = express.Router();

import { createUser, loginUser } from "../controllers/teacher/AuthTeacher.js";

router.post("/auth/register", createUser);

router.post("/auth/login", loginUser);

export default router;
