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
export const assignClassValidation = (data) => {
  return Joi.validate(data, {
    class_id: Joi.string()
      .min(10)
      .max(30)
      .required()
      .error(() => "Please enter valid class id"),
    class_name: Joi.string()
      .required()
      .min(1)
      .error(() => "Please enter valid class name"),
    section: Joi.string()
      .required()
      .min(1)
      .error(() => "Please enter valid section name"),
    teacher_id: Joi.string()
      .required()
      .min(10)
      .max(30)
      .error(() => "Please enter valid teacher id"),
  });
};

//-------------Assign--Class section-----------------------
export const assignSectionValidation = (data) => {
  return Joi.validate(data, {
    class_id: Joi.string()
      .min(10)
      .max(30)
      .required()
      .error(() => "Please enter valid class id"),
    class_name: Joi.string()
      .required()
      .min(1)
      .error(() => "Please enter valid class name"),
    section: Joi.string()
      .required()
      .min(1)
      .error(() => "Please enter valid section name"),
    student_id: Joi.string()
      .required()
      .min(10)
      .max(30)
      .error(() => "Please enter valid student id"),
  });
};
