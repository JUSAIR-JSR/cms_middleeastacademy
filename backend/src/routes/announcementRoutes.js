import express from "express";
import { adminAuth } from "../middlewares/adminAuth.js";
import {
  getAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController.js";

const router = express.Router();

/* ADMIN */
router.get("/", adminAuth, getAnnouncements);
router.get("/:id", adminAuth, getAnnouncementById);
router.post("/", adminAuth, createAnnouncement);
router.put("/:id", adminAuth, updateAnnouncement);
router.delete("/:id", adminAuth, deleteAnnouncement);

export default router;
