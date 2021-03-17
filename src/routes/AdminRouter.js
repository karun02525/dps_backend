import express from "express";
const router = express.Router();

import {
  createClasses,
  getClasses,
} from "../controllers/admin/AdminController.js";

router.get("/classes", getClasses);

router.post("/classes", createClasses);

export default router;
