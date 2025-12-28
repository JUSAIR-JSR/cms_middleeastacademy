import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import courseRoutes from "./routes/courseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();

const allowedOrigins = [
  "https://cms.middleeastacademy.in",      // ✅ admin login
  "https://www.middleeastacademy.in",      // public site
  "https://middleeastacademytestdev.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server requests (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
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
