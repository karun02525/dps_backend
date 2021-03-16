import mongoose from "mongoose";
import dotevn from "dotenv";
dotevn.config();
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connection is successfully...."))
  .catch((err) => console.log(`No connection mongodb ${err}`));
