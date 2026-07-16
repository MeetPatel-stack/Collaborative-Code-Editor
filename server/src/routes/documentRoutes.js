import express from "express";
import { documentAccess } from "../middleware/documentAccess.js";
import {
  // createDocument,
  getDocument,
  updateDocument,
  renameDocument,
  deleteDocument,
} from "../controllers/documentController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.post("/", createDocument);

router.get("/:id", authenticateUser,documentAccess, getDocument);

router.put("/:id", authenticateUser, documentAccess,updateDocument);

router.patch("/:id", authenticateUser,documentAccess, renameDocument);

router.delete("/:id", authenticateUser, documentAccess,deleteDocument);

export default router;
