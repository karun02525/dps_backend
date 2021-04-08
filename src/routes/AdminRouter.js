import express from "express";
const router = express.Router();

import {
  createClasses,
  getClasses,
  getParents,
  getStudents,
  assignTeacher,
  getAssignTeacher,
  assignRollno,
} from "../controllers/admin/AdminController.js";

router.post("/classes", createClasses);

router.get("/classes", getClasses);

router.get("/parents", getParents);

router.get("/students", getStudents);

router.post("/assign-teacher", assignTeacher);

router.get("/assign-teacher", getAssignTeacher);

router.post("/assign-rollno", assignRollno);

export default router;
