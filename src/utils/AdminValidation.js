import Joi from "@hapi/joi";

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

export const assignClassValidation = (data) => {
  return Joi.validate(data, {
    class_id: Joi.string()
      .min(10)
      .max(30)
      .required()
      .error(() => "Please enter valid class id"),
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
