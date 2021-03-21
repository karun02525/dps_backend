import mongoose from "mongoose";

let studentRegSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  surname: String,
  email: String,
  phone: String,
  dob: String,
  rollno: String,
  class_id: String,
  section: String,
  address: String,
  pincode: String,
  state: String,
  dist: String,
  postoffice: String,
  country: String,
  password: String,
  parent_id: String,
  student_avatar: String,
  father_avatar: String,
  mother_avatar: String,
  father_fname: String,
  father_lname: String,
  father_sname: String,
  mother_fname: String,
  mother_lname: String,
  mother_sname: String,
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
