import express from "express";

import {
  authenticateUser,
} from "../middleware/authMiddleware.js";

import {
  workspaceAccess,
} from "../middleware/workspaceAccess.js";

import {
  getPresence,
} from "../controllers/presenceController.js";

const router = express.Router();

router.get(
  "/:workspaceId",
  authenticateUser,
  workspaceAccess,
  getPresence
);

export default router;