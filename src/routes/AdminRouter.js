import express from "express";
const router = express.Router();

import {
  createClasses,
  getClasses,
  assignClasses,
} from "../controllers/admin/AdminController.js";

router.get("/classes", getClasses);

router.post("/classes", createClasses);

router.post("/assign-teacher", assignClasses);

export default router;
