import express from "express";
import { adminAuth } from "../middlewares/adminAuth.js";
import {
  getMessages,
  getMessageById,
  markAsRead,
  deleteMessage,
  exportMessages,
  createMessage,
  getMessageStats,
  getUnreadCount,
} from "../controllers/messageController.js";

const router = express.Router();

/* PUBLIC (MAIN WEBSITE) */
router.post("/", createMessage);


/* ADMIN (CMS) FIXED ROUTES */
router.get("/stats", adminAuth, getMessageStats);
router.get("/unread/count", adminAuth, getUnreadCount);
router.get("/export", adminAuth, exportMessages);

/* ADMIN (CMS) DYNAMIC ROUTES */
router.get("/", adminAuth, getMessages);
router.get("/:id", adminAuth, getMessageById);
router.put("/:id/read", adminAuth, markAsRead);
router.delete("/:id", adminAuth, deleteMessage);

export default router;
