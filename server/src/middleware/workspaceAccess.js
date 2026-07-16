import { getWorkspaceMember } from "../services/workspaceMemberService.js";

export const workspaceAccess = async (req, res, next) => {
  try {
    const workspaceId = req.params.workspaceId;

    const member = await getWorkspaceMember(workspaceId, req.user._id);

    if (!member) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this workspace.",
      });
    }

    req.workspaceMember = member;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
