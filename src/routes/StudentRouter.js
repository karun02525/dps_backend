import express from "express";
const router = express.Router();
import { auth } from "../utils/verifyToken.js";

import {
  getUsers,
  getProfile,
  getAttendance,
} from "../controllers/student/StudentController.js";

router.get("/get-profile", getProfile);

router.get("/get-attendance", getAttendance);

router.get("/", auth, getUsers);

export default router;
