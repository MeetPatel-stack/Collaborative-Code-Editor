import WorkspaceMember from "../models/WorkspaceMember.js";

export const getWorkspaceMembers = async (
  workspaceId
) => {
  return await WorkspaceMember.find({
    workspaceId,
  }).populate("userId");
};