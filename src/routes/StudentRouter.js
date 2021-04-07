import express from "express";
const router = express.Router();
import { auth } from "../utils/verifyToken.js";

import {
  getUsers,
  getProfile,
} from "../controllers/student/StudentController.js";

router.get("/", auth, getUsers);

router.get("/get-profile", getProfile);

export default router;
