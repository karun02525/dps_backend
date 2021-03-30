import mongoose from "mongoose";

let studentRegSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  surname: String,
  email: String,
  gender: String,
  phone: String,
  dob: String,
  rollno: String,
  class_id: String,
  class_name: String,
  section: String,
  address: String,
  post_office: String,
  police_station: String,
  dist: String,
  state: String,
  country: String,
  pincode: String,
  password: String,
  parent_id: String,
  student_picture: String,
  father_avatar: String,
  mother_avatar: String,
  father_fname: String,
  father_lname: String,
  father_sname: String,
  mother_fname: String,
  mother_lname: String,
  mother_sname: String,
  parent_phone: String,
  parent_occupation: String,
  student_doc: String,
  parent_doc: String,
  signature: String,
  recept_no: String,
  token: String,

  date: {
    type: Date,
    default: Date.now,
  },
});

studentRegSchema.method("toJSON", function () {
  const { __v, password, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default new mongoose.model("reg-student", studentRegSchema);
