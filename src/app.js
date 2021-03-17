import express from "express";
import dotevn from "dotenv";
import AuthStudentRouter from "./routes/AuthStudentRouter.js";
import StudentRouter from "./routes/StudentRouter.js";
import AuthTeacherRouter from "./routes/AuthTeacherRouter.js";
import TeacherRouter from "./routes/TeacherRouter.js";
import AdminRouter from "./routes/AdminRouter.js";
import "./config/databaseConfig.js";

dotevn.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to homepage"));

app.use("/api/student", AuthStudentRouter);

app.use("/api/student", StudentRouter);

app.use("/api/teacher", AuthTeacherRouter);

app.use("/api/teacher", TeacherRouter);

app.use("/api", AdminRouter);

app.listen(PORT, () => {
  console.log(`server runging on port ${PORT}`);
});
