import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Untitled Workspace",
      trim: true,
    },

    type: {
      type: String,
      enum: ["COLLABORATION", "CLASSROOM"],
      default: "COLLABORATION",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    passwordHash: {
      type: String,
      default: null,
    },

    allowAI: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Workspace", workspaceSchema);