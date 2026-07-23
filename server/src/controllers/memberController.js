import asyncHandler from "../utils/asyncHandler.js";

import ApiResponse from "../utils/ApiResponse.js";

import { getWorkspaceMembersService } from "../services/memberService.js";

export const getWorkspaceMembers = asyncHandler(async (req, res) => {
  const members = await getWorkspaceMembersService(req.params.workspaceId);

  return res.json(
    new ApiResponse(
      200,

      members,

      "Members fetched",
    ),
  );
});
