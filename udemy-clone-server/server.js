import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth-routes.js";
import mongoDBConnect from "./db/mongoDBConnect.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Server is ready");
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mongoDBConnect();
});
