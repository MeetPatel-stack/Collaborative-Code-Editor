import express from "express";

import {
  createDocument,
  getDocument,
  updateDocument,
  renameDocument,
  deleteDocument,
} from "../controllers/documentController.js";

const router = express.Router();

router.post("/", createDocument);

router.get("/:id", getDocument);

router.put("/:id", updateDocument);

router.patch(
  "/:id",
  renameDocument
);

router.delete(
  "/:id",
  deleteDocument
);

export default router;