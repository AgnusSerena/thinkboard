import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middlleware/rateLimiter.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
dotenv.config();

const app = express();
const __dirname = path.resolve();
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

const PORT = process.env.PORT || 5000;

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}
connectDB().then(() => {
  app.listen(5001, () => {
    console.log("Server is running on port", PORT);
  });
});
// "mongodb+srv://agnusserena:VRHSEqbTu5gxFV9V@cluster0.oiiak7c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
