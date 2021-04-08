import express from "express";
const router = express.Router();

import {
  createUser,
  loginParent,
  createParent,
} from "../controllers/student/AuthStudent.js";

router.post("/auth/parent-reg", createParent);

router.post("/auth/register", createUser);

router.post("/auth/login", loginParent);

export default router;
