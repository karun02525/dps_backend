import mongoose from "mongoose";

let TeacherRegSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  surname: String,
  email: String,
  gender: String,
  phone: String,
  alternate_no: String,
  dob: String,
  registration_no: String,
  qualification: String,
  address: String,
  pincode: String,
  state: String,
  dist: String,
  post_office: String,
  country: String,
  class_id: String,
  class_name: String,
  section: String,
  password: String,
  parent_fname: String,
  parent_lname: String,
  parent_sname: String,
  parent_phone: String,
  parent_occupation: String,
  teacher_picture: String,
  token: String,

  date: {
    type: Date,
    default: Date.now,
  },
});

TeacherRegSchema.method("toJSON", function () {
  const { __v, password, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default new mongoose.model("reg-teacher", TeacherRegSchema);
