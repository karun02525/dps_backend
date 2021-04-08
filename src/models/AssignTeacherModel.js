import mongoose from "mongoose";

let assignTeacher = new mongoose.Schema({
  class_id: String,
  class_name: String,
  section: String,
  teacher_id: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

assignTeacher.method("toJSON", function () {
  const { __v, date, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model("teacher-assign", assignTeacher);
