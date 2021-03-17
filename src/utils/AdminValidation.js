import Joi from "@hapi/joi";

export const classValidation = (data) => {
  return Joi.validate(data, {
    classname: Joi.string()
      .min(2)
      .max(10)
      .required()
      .error(() => "Please enter classes name"),
  });
};
