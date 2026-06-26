import express from "express";
import cors from "cors";
import documentRoutes from "./routes/documentRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";


const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/documents", documentRoutes);
app.use("/api/rooms", roomRoutes);

app.get("/", (req, res) => {
    res.send("CodeCollab API Running");
});


export default app;