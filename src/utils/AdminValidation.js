import Joi from "@hapi/joi";

//-------Class validation--------------------------
export const classValidation = (data) => {
  return Joi.validate(data, {
    classname: Joi.string()
      .min(2)
      .max(10)
      .required()
      .error(() => "Please enter classes name"),
    section: Joi.array()
      .required()
      .min(1)
      .error(() => "Please add at least one section"),
  });
};

//-------------Assign--Class teacher-----------------------
export const assignTeacherValidation = (data) => {
  return Joi.validate(data, {
    class_id: Joi.string()
      .min(24)
      .max(24)
      .required()
      .error(() => "Please enter valid class id"),
    class_name: Joi.string()
      .required()
      .min(1)
      .max(5)
      .error(() => "Please enter valid class name"),
    section: Joi.string()
      .required()
      .min(1)
      .max(2)
      .error(() => "Please enter valid section name"),
    teacher_id: Joi.string()
      .required()
      .min(24)
      .max(24)
      .error(() => "Please enter valid teacher id"),
  });
};

//-------------Assign--Class section Roll No-----------------------
export const assignRollnoValidation = (data) => {
  return Joi.validate(data, {
    class_id: Joi.string()
      .min(24)
      .max(24)
      .required()
      .error(() => "Please enter valid class id"),
    class_name: Joi.string()
      .required()
      .min(1)
      .max(5)
      .error(() => "Please enter valid class name"),
    section: Joi.string()
      .required()
      .min(1)
      .max(2)
      .error(() => "Please enter valid section name"),
    student_id: Joi.string()
      .required()
      .min(24)
      .max(24)
      .error(() => "Please enter valid student id"),
      roll_no: Joi.string()
      .required()
      .min(1)
      .max(5)
      .error(() => "Please enter valid roll no"),
  });
};
