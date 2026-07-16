import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createWorkspace,
  getWorkspace,
  getWorkspaceDocuments,
  createWorkspaceDocument,
  joinWorkspace
} from "../controllers/workspaceController.js";

// for schema validation purpose
import { validate } from "../middleware/validate.js";
import { createWorkspaceSchema } from "../validations/workspaceValidation.js";
import { joinWorkspaceSchema } from "../validations/joinWorkspaceValidation.js";

const router = express.Router();

// router.post("/", authenticateUser, createWorkspace);
router.post(
  "/",

  authenticateUser,

  validate(createWorkspaceSchema),

  createWorkspace,
);
router.get("/:workspaceId", authenticateUser, getWorkspace);

router.get("/:workspaceId/documents", authenticateUser, getWorkspaceDocuments);

router.post(
  "/:workspaceId/documents",
  authenticateUser,
  createWorkspaceDocument,
);

router.post(
  "/join",
  authenticateUser,
  validate(joinWorkspaceSchema),
  joinWorkspace
);

export default router;
