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
  atten_date: {
    type: String,
    default: new Date().toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
  },
  datetime: {
    type: String,
    default: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
  },
});

attendanceSchema.method("toJSON", function () {
  const { __v, date, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model("attendance", attendanceSchema);
