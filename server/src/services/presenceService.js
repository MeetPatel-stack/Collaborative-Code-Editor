import WorkspacePresence from "../models/WorkspacePresence.js";

export const getWorkspacePresence = async (workspaceId) => {
  return await WorkspacePresence.find({
    workspaceId,
  }).populate("userId", "name avatar");
};
