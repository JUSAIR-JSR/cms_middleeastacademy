import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import courseRoutes from "./routes/courseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();

app.use(
  cors({
    origin: [
      "https://cmsmiddleeastacademy.vercel.app",
      "https://middleeastacademytestdev.vercel.app",
      "https://www.middleeastacademy.in",
      // "http://localhost:3000",
      // "http://localhost:3001",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/messages", messageRoutes);

export default app;
