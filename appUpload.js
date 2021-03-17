import express from "express";
import dotevn from "dotenv";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

dotevn.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));

app.get("/", (req, res) => res.send("Welcome File upload"));

app.post("/", upload.single("avatar"), (req, res) => {
  res.json({
    message: "File uploaded successfully!",
    url: `http://localhost:5000/uploads/${req.file.filename}`,
  });
});

app.listen(PORT, () => {
  console.log(`server runging on port ${PORT}`);
});
