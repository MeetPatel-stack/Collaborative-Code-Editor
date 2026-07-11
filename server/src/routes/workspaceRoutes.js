import express from "express";
import {
  createWorkspace,
  getWorkspace,
  getWorkspaceDocuments,
  createWorkspaceDocument,
} from "../controllers/workspaceController.js";

const router = express.Router();

router.post("/", createWorkspace);

router.get("/:workspaceId", getWorkspace);

router.get("/:workspaceId/documents", getWorkspaceDocuments);

router.post(
  "/:workspaceId/documents",
  createWorkspaceDocument
);

export default router;
