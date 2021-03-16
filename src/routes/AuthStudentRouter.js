import express from "express";
const router = express.Router();

import { createUser, loginUser } from "../controllers/student/AuthStudent.js";

router.post("/auth/register", createUser);

router.post("/auth/login", loginUser);

export default router;
