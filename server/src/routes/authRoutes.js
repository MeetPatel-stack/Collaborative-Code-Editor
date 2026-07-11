import express from "express";
import passport from "passport";

import { googleSuccess } from "../controllers/authController.js";

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

export default router;