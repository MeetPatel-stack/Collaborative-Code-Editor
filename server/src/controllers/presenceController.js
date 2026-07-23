import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import { getWorkspacePresence } from "../services/presenceService.js";

export const getPresence = asyncHandler(async (req, res) => {
  const users = await getWorkspacePresence(req.params.workspaceId);

  return res.json(new ApiResponse(200, users, "Presence fetched"));
});
