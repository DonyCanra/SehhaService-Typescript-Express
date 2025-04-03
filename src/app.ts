import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { pool } from "./config/db";
import routes from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Routes
routes(app);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Database Connection Check
pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Database connection error:", err));

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
