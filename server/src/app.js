import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import documentRoutes from "./routes/documentRoutes.js";
import workspaceRoutes from "./routes/workspaceRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";

import "./config/passport.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());

app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/workspaces", workspaceRoutes);

app.get("/", (req, res) => {
  res.send("CodeCollab API Running");
});

export default app;
