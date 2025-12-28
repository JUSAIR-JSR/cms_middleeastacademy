import express from "express";
import { adminAuth } from "../middlewares/adminAuth.js";
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getCourses);
router.get("/:id", getCourseById);

/* ADMIN */
router.post("/", adminAuth, createCourse);
router.put("/:id", adminAuth, updateCourse);
router.delete("/:id", adminAuth, deleteCourse);

export default router;
