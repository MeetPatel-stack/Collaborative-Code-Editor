import express from "express";
import {workspaceAccess} from '../middleware/workspaceAccess.js' ;
import {authenticateUser} from '../middleware/authMiddleware.js' ;
import  {getWorkspaceMember}  from "../services/workspaceMemberService.js";
const router = express.Router();

router.get(
  "/:workspaceId/members",

  authenticateUser,

  workspaceAccess,

  getWorkspaceMember,
);

export default router;
