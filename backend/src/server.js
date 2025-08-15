import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middlleware/rateLimiter.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(rateLimiter);

const PORT = process.env.PORT || 5000;

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(5001, () => {
    console.log("Server is running on port", PORT);
  });
});
// "mongodb+srv://agnusserena:VRHSEqbTu5gxFV9V@cluster0.oiiak7c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
