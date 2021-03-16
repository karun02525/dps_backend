import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 30,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 30,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.method("toJSON", function () {
  const { __v, password, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model("User", userSchema);
