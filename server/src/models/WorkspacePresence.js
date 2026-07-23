import mongoose from "mongoose";

const workspacePresenceSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    socketId: {
      type: String,
      required: true,
    },

    currentDocumentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      default: null,
    },

    currentDocumentTitle: {
      type: String,
      default: "",
    },

    activity: {
      type: String,
      enum: ["VIEWING", "EDITING", "IDLE"],
      default: "VIEWING",
    },

    status: {
      type: String,
      enum: ["ONLINE", "OFFLINE"],
      default: "ONLINE",
    },

    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

workspacePresenceSchema.index(
  {
    workspaceId: 1,
    userId: 1,
  },
  {
    unique: true,
  },
);

export default mongoose.model("WorkspacePresence", workspacePresenceSchema);
