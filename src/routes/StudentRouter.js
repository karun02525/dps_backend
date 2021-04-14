import express from "express";
const router = express.Router();
import { auth } from "../utils/verifyToken.js";

import {
  getUsers,
  getProfile,
  getAttendance,
  getDashboard,
} from "../controllers/student/StudentController.js";

router.get("/get-profile", getProfile);

router.get("/dashboard", getDashboard);

router.get("/get-attendance", getAttendance);

router.get("/", auth, getUsers);

export default router;
