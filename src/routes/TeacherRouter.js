import express from "express";
const router = express.Router();
import { auth } from "../utils/verifyToken.js";

import {
  getUsers,
  getStudents,
  getDashboard,
  createAttendance,
} from "../controllers/teacher/TeacherController.js";

router.get("/dashboard", getDashboard);

router.get("/get-students", getStudents);

router.post("/attendance", createAttendance);

router.get("/", getUsers);

//router.get("/:id", auth, getuser);

export default router;
