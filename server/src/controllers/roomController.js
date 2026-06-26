import Room from "../models/Room.js";
import Document from "../models/Document.js";

export const createRoom = async (req, res) => {
  try {
    const { name } = req.body;

    const room = await Room.create({
      name: name?.trim() || "Untitled Workspace",
    });

    const document = await Document.create({
      roomId: room._id,
      title: "main.js",
      language: "javascript",
      code: "",
    });

    res.status(201).json({
      success: true,
      room,
      document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getRoomDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      roomId: req.params.roomId,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createRoomDocument = async (req, res) => {
  try {
    const { title, language } = req.body;

    const document = await Document.create({
      roomId: req.params.roomId,
      title,
      language,
      code: "",
    });

    res.status(201).json({
      success: true,
      document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
