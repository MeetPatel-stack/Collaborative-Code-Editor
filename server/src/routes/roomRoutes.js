import express from "express";
import {
  createRoom,
  getRoom,
  getRoomDocuments,
  createRoomDocument,
} from "../controllers/roomController.js";

const router = express.Router();

router.post("/", createRoom);

router.get("/:roomId", getRoom);

router.get("/:roomId/documents", getRoomDocuments);

router.post(
  "/:roomId/documents",
  createRoomDocument
);

export default router;
