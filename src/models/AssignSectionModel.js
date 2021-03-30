import mongoose from "mongoose";

let assignSection = new mongoose.Schema({
  class_id: String,
  section: String,
  student_id: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

assignSection.method("toJSON", function () {
  const { __v, date, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model("section-assign", assignSection);
