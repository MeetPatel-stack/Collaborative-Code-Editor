import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createWorkspace,
  getWorkspace,
  getWorkspaceDocuments,
  createWorkspaceDocument,
} from "../controllers/workspaceController.js";

const router = express.Router();

router.post("/", authenticateUser, createWorkspace);

router.get("/:workspaceId", authenticateUser, getWorkspace);

router.get("/:workspaceId/documents", authenticateUser, getWorkspaceDocuments);

router.post(
  "/:workspaceId/documents",
  authenticateUser,
  createWorkspaceDocument,
);

export default router;
