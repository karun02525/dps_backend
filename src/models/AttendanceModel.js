import mongoose from "mongoose";

let attendanceSchema = new mongoose.Schema({
  class_id: String,
  teacher_id: String,
  section: String,
  attlist: [
    {
      student_id: String,
      att_type: Number,
      atten_date: String,
    },
  ],
  date: String,
  datetime: String,
});

attendanceSchema.method("toJSON", function () {
  const { __v, date, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model("attendance", attendanceSchema);
