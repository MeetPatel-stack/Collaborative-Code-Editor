import Workspace from "../models/Workspace.js";
import Document from "../models/Document.js";
import { getIO } from "../socket/socket.js";
import bcrypt from "bcrypt";

import WorkspaceMember from "../models/WorkspaceMember.js";
import { createWorkspaceService , getMyWorkspacesService} from "../services/workspaceService.js";

import {
  joinWorkspaceService,
} from "../services/workspaceService.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";


export const createWorkspace = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const { name, type, password } = req.body;

    const workspace = await createWorkspaceService({
      name,

      type,

      ownerId: req.user._id,

      password,
    });

    await WorkspaceMember.create({
      workspaceId: workspace._id,
      userId: req.user._id,
      role: type === "CLASSROOM" ? "TEACHER" : "OWNER",
    });

    const document = await Document.create({
      workspaceId: workspace._id,
      title: "main.js",
      language: "javascript",
      code: "",
    });

    res.status(201).json({
      success: true,
      workspace,
      document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.workspaceId);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      workspace,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWorkspaceDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      workspaceId: req.params.workspaceId,
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

export const createWorkspaceDocument = async (req, res) => {
  try {
    const { title, language } = req.body;

    const document = await Document.create({
      workspaceId: req.params.workspaceId,
      title,
      language,
      code: "",
    });

    const io = getIO();

    io.to(req.params.workspaceId).emit("file-created", document);

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

export const joinWorkspace = asyncHandler(
  async (req, res) => {
    const result =
      await joinWorkspaceService({
        ...req.body,
        user: req.user,
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "Workspace joined successfully"
      )
    );
  }
);


export const getMyWorkspaces = asyncHandler(
  async (req, res) => {
    const workspaces =
      await getMyWorkspacesService(
        req.user._id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        workspaces,
        "Workspaces fetched successfully"
      )
    );
  }
);