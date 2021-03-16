import mongoose from "mongoose";

let studentRegSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  surname: String,
  email: String,
  phone: String,
  dob: String,
  rollno: String,
  address: String,
  password: String,
  token: String,
  student_avatar: String,
  father_avatar: String,
  mother_avatar: String,
  father_fname: String,
  father_lname: String,
  father_sname: String,
  mother_fname: String,
  mother_lname: String,
  mother_sname: String,

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

export default new mongoose.model("Student-register", studentRegSchema);
