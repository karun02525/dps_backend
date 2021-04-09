import Joi from "@hapi/joi";

//for Student Register validation
export const studentRegisterValidation = (data) => {
  const schema = {
    fname: Joi.string().min(3).trim().required(),
    lname: Joi.string().min(3).trim().required(),
    surname: Joi.string().min(3).required(),
    gender: Joi.string().min(4).required(),
    dob: Joi.string().min(5).max(10).required(),
    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .required()
      .error(() => "Please enter valid mobile number"),
    email: Joi.string().min(5).max(40).required().email(),
    class_id: Joi.string().min(20).max(30).required(),
    parent_id: Joi.string().min(5).max(5).trim().required(),
    address: Joi.string().min(15).max(150).required(),
    post_office: Joi.string().min(4).max(15).required(),
    police_station: Joi.string().min(4).max(15).required(),
    pincode: Joi.string()
      .regex(/^[0-9]{6}$/)
      .required()
      .error(() => "Please enter valid pincode"),
    state: Joi.string().min(2).max(20).required(),
    dist: Joi.string().min(4).max(20).required(),
    country: Joi.string().min(2).max(20).required(),
    father_fname: Joi.string().min(3).max(15).required(),
    father_lname: Joi.string().min(3).max(15).required(),
    father_sname: Joi.string().min(3).max(15).required(),
    mother_fname: Joi.string().min(3).max(15).required(),
    mother_lname: Joi.string().min(3).max(15).required(),
    mother_sname: Joi.string().min(3).max(15).required(),
    parent_occupation: Joi.string().min(3).max(15).required(),
    parent_phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .required()
      .error(() => "Please enter valid mobile number"),
    student_picture: Joi.string().allow(null).allow("").optional(),
  };

  return Joi.validate(data, schema);
};

//for parent Register validation
export const parentRegValidation = (data) => {
  const schema = {
    fname: Joi.string().min(3).trim().required(),
    lname: Joi.string().min(3).trim().required(),
    surname: Joi.string().min(3).required(),
    gender: Joi.string().min(4).required(),
    dob: Joi.string().max(10).required(),
  };
  return Joi.validate(data, schema);
};

//login parent
export const parentLoginValidation = (data) => {
  const schema = {
    parent_id: Joi.string().min(5).max(5).required(),
    password: Joi.string().min(5).max(16).required(),
  };
  return Joi.validate(data, schema);
};

//for Teacher Register validation
export const teacherRegisterValidation = (data) => {
  const schema = {
    fname: Joi.string().min(3).required(),
    lname: Joi.string().min(3).required(),
    surname: Joi.string().min(3).required(),
    gender: Joi.string().min(4).required(),
    dob: Joi.string().min(8).max(12).required(),
    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .required()
      .error(() => "Please enter valid mobile number"),
    alternate_no: Joi.string()
      .regex(/^[0-9]{10}$/)
      .required()
      .error(() => "Please enter valid mobile number"),
    email: Joi.string().min(5).max(40).required().email(),
    registration_no: Joi.string().min(1).max(10).required(),
    qualification: Joi.string().min(3).max(25).required(),
    address: Joi.string().min(15).max(150).required(),
    post_office: Joi.string().min(4).max(15).required(),
    pincode: Joi.string()
      .regex(/^[0-9]{6}$/)
      .required()
      .error(() => "Please enter valid pincode"),
    state: Joi.string().min(2).max(20).required(),
    dist: Joi.string().min(5).max(20).required(),
    country: Joi.string().min(2).max(20).required(),
    parent_fname: Joi.string().min(3).max(15).required(),
    parent_lname: Joi.string().min(3).max(15).required(),
    parent_sname: Joi.string().min(3).max(15).required(),
    parent_phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .required()
      .error(() => "Please enter valid mobile number"),
    parent_occupation: Joi.string().min(3).max(15).required(),
    teacher_picture: Joi.string().allow(null).allow("").optional(),
  };

  return Joi.validate(data, schema);
};

//for Teacher login
export const teacherLoginValidation = (data) => {
  const schema = {
    registration_no: Joi.string().min(2).max(10).required(),
    password: Joi.string().min(5).max(20).required(),
  };
  return Joi.validate(data, schema);
};
