import bcrypt from "bcrypt";
import Workspace from "../models/Workspace.js";

// to create a custom code in schema
import { customAlphabet } from "nanoid";

import WorkspaceMember from "../models/WorkspaceMember.js";
import ApiError from "../utils/ApiError.js";

const nanoid = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 6);

export const createWorkspaceService = async ({
  name,
  type,
  ownerId,
  password,
}) => {
  const passwordHash = await bcrypt.hash(password, 10);

  const joinCode = `${
    type === "CLASSROOM" ? "LAB" : "TEAM"
  }-${nanoid()}`.toUpperCase();

  const workspace = await Workspace.create({
    name,

    type,

    owner: ownerId,

    passwordHash,
    joinCode,
  });

  return workspace;
};

export const joinWorkspaceService = async ({ joinCode, password, user }) => {
  const workspace = await Workspace.findOne({
    joinCode: joinCode.trim().toUpperCase(),
  });

  if (!workspace) {
    throw new ApiError(404, "Workspace not found");
  }

  if (!workspace.isJoinEnabled) {
    throw new ApiError(403, "Joining this workspace is disabled");
  }

  const existingMember = await WorkspaceMember.findOne({
    workspaceId: workspace._id,
    userId: user._id,
  });

  if (existingMember) {
    return {
      workspace,
      alreadyMember: true,
    };
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    workspace.passwordHash,
  );

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid workspace password");
  }

  const role = workspace.type === "CLASSROOM" ? "STUDENT" : "MEMBER";

  await WorkspaceMember.create({
    workspaceId: workspace._id,
    userId: user._id,
    role,
  });

  return {
    workspace,
    alreadyMember: false,
  };
};

export const getMyWorkspacesService = async (userId) => {
  const memberships = await WorkspaceMember.find({
    userId,
  });

  const workspaceIds = memberships.map((member) => member.workspaceId);

  const workspaces = await Workspace.find({
    _id: {
      $in: workspaceIds,
    },
  });

  return workspaces;
};

export const getWorkspaceMembersService = async (workspaceId) => {
  const members = await WorkspaceMember.find({
    workspaceId,
  }).populate("userId", "name avatar");

  return members;
};
