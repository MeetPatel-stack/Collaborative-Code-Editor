import WorkspaceMember from "../models/WorkspaceMember.js";

// export const getWorkspaceMembers = async (
//   workspaceId
// ) => {
//   return await WorkspaceMember.find({
//     workspaceId,
//   }).populate("userId");
// };

export const  getWorkspaceMember =
async (
  workspaceId,
  userId
) => {
  return await WorkspaceMember.findOne({
    workspaceId,
    userId,
  });
};