import mongoose from "mongoose";

let parentRegSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  surname: String,
  gender: String,
  dob: String,
  parent_id:String,
  password:String,
  token: String,

  date: {
    type: Date,
    default: Date.now,
  },
});

parentRegSchema.method("toJSON", function () {
  const { __v, password, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default new mongoose.model("reg-parent", parentRegSchema);
