import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createWorkspace,
  getWorkspace,
  getWorkspaceDocuments,
  createWorkspaceDocument,
  joinWorkspace,
  getMyWorkspaces,
} from "../controllers/workspaceController.js";

// for schema validation purpose
import { validate } from "../middleware/validate.js";
import { createWorkspaceSchema } from "../validations/workspaceValidation.js";
import { joinWorkspaceSchema } from "../validations/joinWorkspaceValidation.js";
import { workspaceAccess } from "../middleware/workspaceAccess.js";
const router = express.Router();

// router.post("/", authenticateUser, createWorkspace);
router.post(
  "/",

  authenticateUser,

  validate(createWorkspaceSchema),

  createWorkspace,
);
router.get("/my", authenticateUser, getMyWorkspaces);

router.get("/:workspaceId", authenticateUser, workspaceAccess, getWorkspace);

router.get(
  "/:workspaceId/documents",
  authenticateUser,
  workspaceAccess,
  getWorkspaceDocuments,
);

router.post(
  "/:workspaceId/documents",
  authenticateUser,
  workspaceAccess,
  createWorkspaceDocument,
);

router.post(
  "/join",
  authenticateUser,
  validate(joinWorkspaceSchema),
  joinWorkspace,
);

export default router;
