import express from "express";
import dotevn from "dotenv";
import studentRouter from "./routes/AuthStudentRouter.js";
import "./config/databaseConfig.js";

dotevn.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to homepage"));

app.use("/api", studentRouter);

app.listen(PORT, () => {
  console.log(`server runging on port ${PORT}`);
});
