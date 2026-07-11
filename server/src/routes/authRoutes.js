import express from "express";
import passport from "passport";

import { googleSuccess , getCurrentUser } from "../controllers/authController.js";
import { authenticateUser  } from "../middleware/authMiddleware.js";
const router = express.Router();

/*
|--------------------------------------------------------------------------
| Start Google Login
|--------------------------------------------------------------------------
*/

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

/*
|--------------------------------------------------------------------------
| Google Callback
|--------------------------------------------------------------------------
*/

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    session: true,
  }),
  googleSuccess
);

router.get(
  "/me",
  authenticateUser,
  getCurrentUser
);

export default router;