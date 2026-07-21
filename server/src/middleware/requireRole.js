import ApiError from "../utils/ApiError.js";

export const requireRole =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.workspaceMember.role)) {
      throw new ApiError(403, "You don't have permission");
    }

    next();
  };
