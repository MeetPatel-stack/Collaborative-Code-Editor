import Document from "../models/Document.js";
import {
  getWorkspaceMember,
} from "../services/workspaceMemberService.js";

export const documentAccess = async (
  req,
  res,
  next
) => {
  try {
    const document = await Document.findById(
      req.params.id
    );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    const member =
      await getWorkspaceMember(
        document.workspaceId,
        req.user._id
      );

    if (!member) {
      return res.status(403).json({
        success: false,
        message:
          "You don't have access to this document.",
      });
    }

    req.document = document;
    req.workspaceMember = member;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};