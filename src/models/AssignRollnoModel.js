import mongoose from "mongoose";

let assignRollno = new mongoose.Schema({
  class_id: String,
  class_name:String,
  section: String,
  student_id: String,
  roll_no:String,
  date: {
    type: Date,
    default: Date.now,
  },
});

assignRollno.method("toJSON", function () {
  const { __v, date, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model("rollno-assign", assignRollno);
