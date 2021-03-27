import express from "express";
const router = express.Router();

import {
  createClasses,
  getClasses,
  assignClasses,
  getStudents,
} from "../controllers/admin/AdminController.js";

router.get("/classes", getClasses);

router.post("/classes", createClasses);

router.post("/assign-teacher", assignClasses);

router.get("/get-student", getStudents);

export default router;
