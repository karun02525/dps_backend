import express from "express";
const router = express.Router();
import { auth } from "../utils/verifyToken.js";

import {
  getUsers,
  getStudents,
} from "../controllers/teacher/TeacherController.js";

router.get("/get-students", getStudents);

router.get("/", getUsers);

//router.get("/:id", auth, getuser);

export default router;
