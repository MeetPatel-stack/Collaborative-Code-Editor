import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./config/db.js";
import { setIO } from "./socket/socket.js";

// model to launh the status of presence
import WorkspacePresence from "./models/WorkspacePresence.js";

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
  socket.on("join-workspace", async ({ workspaceId, userId }) => {
    socket.join(workspaceId);

    await WorkspacePresence.findOneAndUpdate(
      {
        workspaceId,
        userId,
      },
      {
        socketId: socket.id,
        status: "ONLINE",
        lastSeen: new Date(),
      },
      {
        upsert: true,
        new: true,
      },
    );

    io.to(workspaceId).emit("presence-updated");
  });

  socket.on(
    "document-opened",
    async ({ workspaceId, userId, documentId, documentTitle }) => {
      await WorkspacePresence.findOneAndUpdate(
        {
          workspaceId,
          userId,
        },
        {
          currentDocumentId: documentId,
          currentDocumentTitle: documentTitle,
          activity: "VIEWING",
        },
      );

      io.to(workspaceId).emit("presence-updated");
    },
  );

  socket.on("editing-started", async ({ workspaceId, userId }) => {
    await WorkspacePresence.findOneAndUpdate(
      {
        workspaceId,
        userId,
      },
      {
        activity: "EDITING",
      },
    );

    io.to(workspaceId).emit("presence-updated");
  });


  socket.on("editing-stopped", async ({ workspaceId, userId }) => {
    await WorkspacePresence.findOneAndUpdate(
      {
        workspaceId,
        userId,
      },
      {
        activity: "IDLE",
      },
    );

    io.to(workspaceId).emit("presence-updated");
  });

  
  socket.on("disconnect", async () => {
    await WorkspacePresence.findOneAndUpdate(
      {
        socketId: socket.id,
      },
      {
        status: "OFFLINE",
        lastSeen: new Date(),
      },
    );
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
