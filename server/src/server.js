import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./config/db.js";
import { setIO } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;
connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

setIO(io);

io.on("connection", (socket) => {

  socket.on("join-room", (workspaceId) => {
    socket.join(workspaceId);
  });

  socket.on("code-change", ({ workspaceId, documentId, code }) => {
    socket.to(workspaceId).emit("receive-change", {
      documentId,
      code,
    });
  });
  
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
