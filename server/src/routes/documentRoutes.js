import express from "express";

import {
  createDocument,
  getDocument,
  updateDocument,
} from "../controllers/documentController.js";

const router = express.Router();

router.post("/", createDocument);

router.get("/:id", getDocument);

router.put("/:id", updateDocument);

export default router;