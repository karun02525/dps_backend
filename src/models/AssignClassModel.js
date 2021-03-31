import mongoose from "mongoose";

let assignClass = new mongoose.Schema({
  class_id: String,
  class_name: String,
  section: String,
  teacher_id: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

assignClass.method("toJSON", function () {
  const { __v, date, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model("class-assign", assignClass);
