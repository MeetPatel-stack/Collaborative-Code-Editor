import mongoose from "mongoose";

const workspaceMemberSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,// after auth this will be true
    },

    role: {
      type: String,
      enum: [
        "OWNER",
        "MEMBER",
        "TEACHER",
        "STUDENT",
      ],
      default: "MEMBER",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate membership
workspaceMemberSchema.index(
  {
    workspaceId: 1,
    userId: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model(
  "WorkspaceMember",
  workspaceMemberSchema
);