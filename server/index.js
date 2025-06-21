import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";

dotenv.config();
const corsOptions = {
  origin: "https://college-project-neon.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// Socket io integration

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://college-project-neon.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// server.listen(3001, () => {
//   console.log("Socket server is running on port 3001"); https://college-project-neon.vercel.app
// });

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join project", (projectId) => {
    if (!projectId) return console.error("Invalid projectId");
    socket.join(projectId);
    console.log(`User ${socket.id} joined project: ${projectId}`);
  });

  socket.on("new message", ({ projectId, sender, message }) => {
    if (!projectId || !sender || !message)
      return console.error(
        "Missing data for new message",
        projectId,
        sender,
        message
      );

    console.log("New message:", projectId, sender, message);

    io.in(projectId).emit("received message", {
      sender: sender,
      message: message,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Socket io integration

connectDB();
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Middleware
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes

import userRoutes from "./routes/UserRoutes.js";
import taskRoutes from "./routes/TaskRoutes.js";
import memberRoutes from "./routes/MemberRoute.js";
import projectRouter from "./routes/ProjectRoutes.js";
import projectTaskRouter from "./routes/ProjectTaskRoutes.js";
import messageRouter from "./routes/MessageRoute.js";
import emailRouter from "./routes/EmailRoute.js";

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/project", projectRouter);
app.use("/api/projecttask", projectTaskRouter);
app.use("/api/message", messageRouter);
app.use("/api/email", emailRouter);
