import mongoose from "mongoose";

let classSchema = new mongoose.Schema({
  classname: {
    type: String,
    required: true,
    min: 2,
    max: 10,
  },
  section: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

classSchema.method("toJSON", function () {
  const { __v, date, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model("classes", classSchema);
